'use client'

import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import authenticator from '@/firebase/authenticator'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import sendRequestToAuthServer from '@/utils/helpers/sendRequestToAuthServer'
import { SERVER_URLS } from '@/utils/constants'
import logger from '@/logger'

const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({}),
    [isLoading, setIsLoading] = useState(false),
    [emailVerificationStatus, setEmailVerificationStatus] = useState(),
    router = useRouter(),
    pathname = usePathname(),
    searchParams = useSearchParams(),
    redirectToken = searchParams.get('t')

  useEffect(() => {
    if (authenticator.currentUser) {
      //send verification if the current user changes and their email is unverified
      if (
        !authenticator.currentUser.emailVerified &&
        (emailVerificationStatus === 'not sent' || emailVerificationStatus === null)
      ) {
        authenticator
          .verifyEmail()
          .then(() => {
            localStorage.setItem('emailVerificationStatus', 'sent')
            setEmailVerificationStatus(localStorage.getItem('emailVerificationStatus'))
            console.log('emailVerificationStatus set to Sent')
          })
          .catch(() => alert('Could not verify your email'))
      }
    }
  }, [authenticator.currentUser])

  useEffect(() => {
    //Add observer for authentication state change.
    const authState = onAuthStateChanged(authenticator.fbAuthInstance, async (userDetails) => {
      if (userDetails) {
        if (JSON.stringify(userDetails) !== JSON.stringify(authenticator.currentUser)) {
          await authenticator.currentUser.reload()
        }

        setCurrentUser(userDetails)

        if (!emailVerificationStatus) {
          localStorage.setItem('emailVerificationStatus', 'not sent')
          setEmailVerificationStatus(localStorage.getItem('emailVerificationStatus'))
          console.log('emailVerificationStatus set to Not Sent');
        }
      } else {
        setCurrentUser(null)
        console.log('setCurrentUser is null');
      }
      setIsLoading(false)
      console.log('process complete');
    })

    setEmailVerificationStatus(localStorage.getItem('emailVerificationStatus'))
    return () => authState()
  }, [])

  async function redirectUserBasedOnOrigin(activeFeatureFlags = '') {
    try {
      //store token in database
      const { token } = await (await sendRequestToAuthServer('token')).json(),
        { roles } = await authenticator.additionalUserInfo()
      console.log('fetching roles', roles);
      if (redirectToken) {
        const { from } = await (await sendRequestToAuthServer(`token/verify?t=${redirectToken}`)).json()

        if (from && from.toLowerCase() === 'rnm') {
          const { roles } = await authenticator.additionalUserInfo()

          if (roles.includes('rnm-pro')) {
            authenticator.signout()
            window.location.href = `${SERVER_URLS.rnm}/profile?u=${token}`
            setIsLoading(false)
            return
          }

          authenticator.signout()
          window.location.href = `${SERVER_URLS.rnm}/data?u=${token}`
          setIsLoading(false)
          return
        }

        if (from && from.toLowerCase() === 'app-status-rest') {
          authenticator.signout()
          window.location.href = `${SERVER_URLS.appStatusRest}?u=${token}`
          setIsLoading(false)
          return
        }
        return
      }
      if (token) {
        const { roles } = await authenticator.additionalUserInfo()
        if (roles?.includes('rnm-free')) {
          router.push(`${SERVER_URLS.rnm}/home?u=${token}`)
          setIsLoading(false)
          return
        }
        setIsLoading(false)
        return
      }

      //redirect user internally
      if (activeFeatureFlags.includes('qa') && pathname === '/auth/signup') {
        router.push('/qa')
        setIsLoading(false)
      } else {
        router.push('/dashboard/account')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error, ', error);
      alert('Please try again.')
      setIsLoading(false)
      return
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isLoading,
        setIsLoading,
        setCurrentUser,
        redirectUserBasedOnOrigin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

'use client'

import { useState, useEffect } from 'react'
import InputLayout from '@/app/[lng]/components/input'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useAuthContext } from '@/app/[lng]/context/Auth.Context'
import { useFeatureFlagContext } from '@/app/[lng]/context/FeatureFlags.Context'
// import { useToast } from "@chakra-ui/react";
import authenticator from '@/firebase/authenticator'
import sendRequestToAuthServer from '@/utils/helpers/sendRequestToAuthServer'
import Image from 'next/image'
import mixpanel from '@/services/mixpanel'
import logger from '@/logger'
import { CircularProgress } from '@mui/material'
//import { SERVER_URLS } from '@/utils/constants'

export default function SignUp({ subscription, lng, t }) {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    router = useRouter(),
    [isLoading, setIsLoading] = useState(false),
    { activeFeatureFlags, loadingFeatureFlags } = useFeatureFlagContext(),
    { redirectUserBasedOnOrigin } = useAuthContext(),
    searchParams = useSearchParams(),
    redirectToken = searchParams.get('t'),
    // toast = useToast(),
    [isAlreadyUsed, setIsAlreadyUsed] = useState(false)

  useEffect(() => {
    if (authenticator.currentUser) {
      ;(async () => {
        const { roles } = await authenticator.additionalUserInfo()
        if (authenticator.currentUser && !roles) {
          setIsLoading(true)
          addRole()
        }
      })()
    }

    return
  }, [authenticator.currentUser])

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    setIsLoading(!isLoading)

    if (validateEmail(email)) {
      try {
        await authenticator.signupEmailAndPassword(email, password)
        console.log(authenticator.currentUser.uid)
        mixpanel.identify(authenticator.currentUser.uid)
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setIsLoading(false)
          setIsAlreadyUsed(true)
          console.log('double email coaught')
          // toast({
          //   title: `${email} already registered.`,
          //   description: "Please login instead or change email.",
          //   status: "error",
          //   duration: 6000,
          //   isClosable: true,
          // });
        } else {
          console.error('Error logging in', error)
          alert("could't login")
          setIsLoading(false)
        }
        // } finally {
        //   toast({
        //     title: "Success!",
        //     description: `Sign up successful. Now redirecting...`,
        //     status: "success",
        //     duration: 3000,
        //     isClosable: true,
        //   });
      }
    } else {
      //console.error("Invalid email format!");
      alert('Invalid email format')
      setIsLoading(false)
    }
  }
  //async function addRole(request: NextRequest){ //onlypossible if thisis a typescript file
  async function addRole() {
    setIsLoading(true)

    let url
    try {
      if (redirectToken) {
        console.log('RedirectToken supplied so now generating claim')
        url = `claims?t=${redirectToken}`
      } else {
        console.log('No token supplied, generating one')

        //const response = await fetch(`${ SERVER_URLS.host }/api/generate-token`, {

        //const response = await fetch(`${request.nextUrl.protocol}//${request.nextUrl.host}'/api/generate-token', {
        const response = await fetch('/api/generate-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscription: 'RNM-Free',
          }),
        })
        const { res } = await response
        const { token } = await response.json()
        url = `claims?t=${token}`
        console.log('Generated token: ', res)
      }
    } catch (error) {
      console.error('Error generating token: ', error)
      //return
      return res.status(401).json(error)
    }
    if (url) {
      console.log('sendRequestToAuthServer: ', url)

      sendRequestToAuthServer(url)
        .then(async (res) => {
          if (res.ok) {
            console.log('sendRequestToAuthServer: ', url)

            await authenticator.currentUser.reload()
            await authenticator.currentUser.getIdToken(true)
            await redirectUserBasedOnOrigin(activeFeatureFlags)
            setIsLoading(false)
            return
          }
          throw 'Could not create account'
        })
        .catch(async (error) => {
          console.log('Error adding roles', error)
          await authenticator.deleteUser()
          setIsLoading(false)
          alert('Could not create account')
          return
        })
    }
  }

  async function handleGoogleSignUp() {
    setIsLoading(!isLoading)
    await authenticator.signInWithPopupGoogle()
    setIsLoading(!isLoading)
  }

  const handleEmailChange = (e) => {
    if (e.target.value !== email) setIsAlreadyUsed(false)
    setEmail(e.target.value)
  }

  return (
    <div className='tw-flex tw-w-full tw-h-full tw-justify-center tw-items-center tw-rounded-r-xl '>
      {isLoading ? (
        <div>
          <p> Signing up </p>
          <CircularProgress />
        </div>
      ) : (
        <section className='tw-flex tw-w-full tw-h-full tw-justify-center tw-items-center tw-rounded-r-xl'>
          <div className='tw-w-full tw-py-[30px] lg:tw-py-2 tw-h-full tw-mx-auto tw-rounded-xl lg:tw-rounded-none lg:tw-rounded-r-xl tw-bg-white/50 tw-px-10 '>
            <Image
              src={'/companyLogo.png'}
              width={50}
              height={50}
              alt='Betr Beta Logo'
              className='tw-mx-auto tw-mb-4'
            />
            <p className='tw-text-slate-500 dark:tw-text-white tw-text-center tw-text-sm'>Hi there, Welcome!</p>
            <h1 className='tw-text-xl tw-text-center tw-font-medium'>Create Your Account</h1>

            {/* google sign up---------------------- */}
            <div className='tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-sm tw-mt-5'>
              <div className='tw-h-[1px] tw-w-full tw-bg-slate-300 tw-hidden md:tw-block'></div>
              <p className='tw-whitespace-nowrap'>Sign up with</p>
              <div className='tw-h-[1px] tw-w-full tw-bg-slate-300 tw-hidden md:tw-block'></div>
            </div>

            <div className='tw-flex tw-flex-col md:tw-flex-row lg:tw-flex-col xl:tw-flex-row tw-gap-2'>
              <button
                onClick={handleGoogleSignUp}
                className='tw-w-full tw-text-center tw-py-3 tw-my-3 tw-border tw-flex tw-space-x-2 tw-items-center tw-justify-center tw-border-slate-200 tw-rounded-lg tw-text-slate-700 dark:tw-text-white tw-hover:border-slate-400 tw-hover:text-slate-900 tw-hover:shadow tw-transition tw-duration-150'
              >
                <Image
                  src='https://www.svgrepo.com/show/355037/google.svg'
                  className='tw-w-6 tw-h-6'
                  alt='Google icon'
                  width={50}
                  height={50}
                />{' '}
                <span>Google</span>
              </button>
              {/* microsoft sign up*/}
              {/* <button
                onClick={ handleGoogleSignUp }

                className="tw-w-full tw-text-center tw-py-3 tw-my-3 tw-border tw-flex tw-space-x-2 tw-items-center tw-justify-center tw-border-slate-200 tw-rounded-lg tw-text-slate-700 dark:tw-text-white tw-hover:border-slate-400 tw-hover:text-slate-900 tw-hover:shadow tw-transition tw-duration-150"
              >
                <Image
                  src="https://img.freepik.com/free-icon/microsoft_318-566086.jpg"
                  className="tw-w-6 tw-h-6"
                  alt="Microsoft icon"
                   width={50}
                   height={50}
                />{" "}
                <span>Microsoft</span>
              </button> */}
            </div>
            <div className='tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-sm'>
              <div className='tw-h-[1px] tw-w-full tw-bg-slate-300 tw-hidden md:tw-block'></div>
              <p>Or</p>
              <div className='tw-h-[1px] tw-w-full tw-bg-slate-300 tw-hidden md:tw-block'></div>
            </div>

            <form onSubmit={handleSubmit} className='tw-my-5'>
              <div className='tw-flex tw-flex-col tw-space-y-5 tw-text-left'>
                <section className='w-full'>
                  <label htmlFor='email' className='tw-capitalize'>
                    Company email
                  </label>
                  <input
                    id='email'
                    type='email'
                    placeholder='example@company.com'
                    className='tw-my-2 tw-p-3 tw-w-full tw-rounded-lg tw-bg-indigo-100 dark:tw-text-black dark:tw-bg-white'
                    onChange={handleEmailChange}
                  />
                  {isAlreadyUsed && (
                    <p>
                      <span className='tw-text-red-700'> {email} is already registered. </span>
                      <span className='tw-text-gray-200'> Please choose a different email or </span>
                      <Link
                        href={`${redirectToken ? '/auth/signin?t=' + redirectToken : '/auth/signin'}`}
                        className='tw-text-indigo-600 tw-font-medium tw-inline-flex tw-space-x-1 tw-items-center'
                      >
                        <span className='tw-text-indigo-600'>Login</span>
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='tw-h-4 tw-w-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                            />
                          </svg>
                        </span>
                      </Link>
                    </p>
                  )}
                </section>
                <section className='w-full'>
                  <label htmlFor='password' className='tw-capitalize'>
                    Password
                  </label>
                  <input
                    id='password'
                    type='password'
                    placeholder='**********'
                    className='tw-my-2 tw-p-3 tw-w-full tw-rounded-lg tw-bg-indigo-100 dark:tw-text-black dark:tw-bg-white'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </section>

                <button
                  type='submit'
                  className='tw-w-full tw-py-3 tw-font-medium tw-text-white tw-bg-indigo-600 tw-hover:bg-indigo-500 tw-rounded-lg tw-border-indigo-500 tw-hover:shadow tw-inline-flex tw-space-x-2 tw-items-center tw-justify-center'
                  onClick={() => {
                    mixpanel.track('Sign up', {
                      buttonName: 'Signup',
                      action: 'Submit Registeration Form',
                    })
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='tw-h-6 tw-w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                    />
                  </svg>
                  <span>Signup</span>
                </button>
                <p className='tw-text-center tw-text-sm'>
                  Already have an account ?{' '}
                  <Link
                    href={`${redirectToken ? '/auth/signin?t=' + redirectToken : '/auth/signin'}`}
                    className='tw-text-indigo-600 tw-font-medium tw-inline-flex tw-space-x-1 tw-items-center'
                  >
                    <span
                      onClick={() => {
                        mixpanel.track('Log in', {
                          buttonName: 'Login',
                          action: 'Log in form',
                        })
                      }}
                    >
                      {' '}
                      Login{' '}
                    </span>
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='tw-h-4 tw-w-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth='2'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                        />
                      </svg>
                    </span>
                  </Link>
                </p>
                <p className='tw-text-xs tw-text-center'>
                  By signing up, you agree to our{' '}
                  <Link href='https://betrbeta.com/TermsOfUsePage' className='tw-text-blue-600'>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href='https://betrbeta.com/PrivacyPolicyPage' className='tw-text-blue-600'>
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}

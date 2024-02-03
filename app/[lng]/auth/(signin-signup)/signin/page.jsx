'use client'

import logger from '@/logger'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useAuthContext } from '@/app/[lng]/context/Auth.Context'
import authenticator from '@/firebase/authenticator'
import Image from 'next/image'
import mixpanel from '@/services/mixpanel'
import { useFeatureFlagContext } from '@/app/[lng]/context/FeatureFlags.Context'
import { CircularProgress } from '@mui/material'

export default function SignIn() {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    router = useRouter(),
    [isLoading, setIsLoading] = useState(false)
  const [isWrongPassword, setIsWrongPassword] = useState(false)
  const [isUserNotFound, setIsUserNotFound] = useState(false),
    { redirectUserBasedOnOrigin } = useAuthContext(),
    searchParams = useSearchParams(),
    redirectToken = searchParams.get('t'),
    { activeFeatureFlags, loadingFeatureFlags } = useFeatureFlagContext()

  useEffect(() => {
    if (authenticator.currentUser) {
      ;(async () => {
        setIsLoading(true)
        try {
          await redirectUserBasedOnOrigin(activeFeatureFlags)
          await authenticator.signout()
          setIsLoading(false)
        } catch (error) {
          console.error('Error signing out current user', error)
          setIsLoading(false)
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
    setIsLoading(true)

    if (validateEmail(email)) {
      try {
        await authenticator.signinEmailAndPassword(email, password)
        console.log(authenticator.currentUser.uid)
        mixpanel.identify(authenticator.currentUser.uid)
      } catch (err) {
        if (
          err.code === 'auth/invalid-login-credentials' ||
          err === `Please ensure that you've entered a valid email and password.`
        ) {
          setIsLoading(false)
          setIsUserNotFound(true)
          // alert('Account not found. Please check your email address or Sign Up');
          console.log('user not found')
        } else if (err.code === 'auth/wrong-password') {
          setIsWrongPassword(true)
          setIsLoading(false)
        } else {
          console.error('Error logging user in', err)
          alert('Could not login')
          setIsLoading(false)
        }
        // } finally {
        //   toast({
        //     title: "Success!",
        //     description: `Login successful. Now redirecting...`,
        //     status: "success",
        //     duration: 6000,
        //     isClosable: true,
        //   });
      }
    } else {
      //console.error("Invalid email format!");
      alert('Invalid email format')
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(!isLoading)

    try {
      await authenticator.signInWithPopupGoogle() // Initiate the authentication process
      const user = await authenticator.handleAuthRedirects()

      if (user && user.user) {
        await authenticator
          .signInWithPopupGoogle()
          .then((res) => {
            console.log('Authentication successful:', res)
            setIsLoading(false)
            mixpanel.identify(res.uid)
          })
          .catch((err) => {
            console.error('Authentication error:', err)
            setIsLoading(false)
          })
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error with Google auth provider', error)
      setIsLoading(false)
    }
  }

  const handleEmailChange = (e) => {
    if (e.target.value !== email) setIsUserNotFound(false)
    setEmail(e.target.value)
  }

  return (
    <div className='tw-flex tw-w-full tw-h-full tw-justify-center tw-items-center tw-rounded-r-xl '>
      {isLoading ? (
        <div>
          <p> Signing in </p>
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
            <p className='tw-text-slate-500 dark:tw-text-white tw-text-center tw-text-sm'>Hi, Welcome back! 👋</p>
            <h1 className='tw-text-xl tw-font-medium tw-text-center'>Login to your Account</h1>

            {/* google login---------------------- */}
            <div className='tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-sm tw-mt-5'>
              <div className='tw-h-[1px] tw-hidden md:tw-block tw-w-1/2 tw-bg-slate-300'></div>
              <p className='tw-whitespace-nowrap'>Login with</p>
              <div className='tw-h-[1px] tw-hidden md:tw-block tw-w-1/2 tw-bg-slate-300'></div>
            </div>
            <div className='tw-flex tw-flex-col md:tw-flex-row lg:tw-flex-col xl:tw-flex-row tw-gap-2'>
              <button
                onClick={handleGoogleSignIn}
                className='tw-w-full tw-text-center tw-py-3 tw-my-3 tw-border tw-flex tw-space-x-2 tw-items-center tw-justify-center tw-border-slate-200 tw-rounded-lg tw-text-slate-700 dark:tw-text-white tw-hover:border-slate-400 tw-hover:text-slate-900 tw-hover:shadow tw-transition tw-duration-150'
              >
                <Image
                  width={50}
                  height={50}
                  src='https://www.svgrepo.com/show/355037/google.svg'
                  className='tw-w-6 tw-h-6'
                  alt='Google icon'
                />{' '}
                <span>Google</span>
              </button>
              {/* microsoft login*/}
              {/* <button
                onClick={ handleGoogleSignIn }

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
              <p className='tw-whitespace-nowrap'>Or</p>
              <div className='tw-h-[1px] tw-w-full tw-bg-slate-300 tw-hidden md:tw-block'></div>
            </div>

            <form onSubmit={handleSubmit} className='tw-my-5'>
              <div className='tw-flex tw-flex-col'>
                <section className='w-full tw-text-left'>
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

                  {isUserNotFound && (
                    <p style={{ marginBottom: '1rem' }}>
                      <span className='tw-text-red-700'> {email} not found. </span>
                      <span className='tw-text-gray-200'> Please check your email address or </span>
                      <Link
                        href={`${redirectToken ? '/auth/signup?t=' + redirectToken : '/auth/signup'}`}
                        className='tw-text-indigo-600 tw-font-medium tw-inline-flex tw-space-x-1 tw-items-center'
                      >
                        <span className='tw-text-indigo-600'>Register Now</span>
                        <ExternalLinkIcon className='currentColor'></ExternalLinkIcon>
                      </Link>
                    </p>
                  )}
                </section>
                <section className='w-full tw-text-left tw-mt-2'>
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
                  {isWrongPassword && (
                    <p style={{ marginBottom: '1rem' }}>
                      <span className='tw-text-red-700'> Password for {email} is wrong. </span>
                      <span className='tw-text-gray-200'> Please type correct password or </span>
                      <Link
                        href='/auth/ForgotPassword'
                        className='tw-text-indigo-600 tw-font-medium tw-inline-flex tw-space-x-1 tw-items-center'
                      >
                        <span className='tw-text-indigo-600'>Reset password</span>
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
                      <span className='tw-text-gray-500'> if forgot.</span>
                    </p>
                  )}
                </section>
                <div className='tw-flex tw-flex-row tw-justify-between tw-text-xs tw-w-full tw-items-center xl:tw-mt-3'>
                  <div>
                    <label htmlFor='remember' className=' tw-flex tw-justify-center tw-items-center'>
                      <input
                        type='checkbox'
                        id='remember'
                        className='tw-w-4 tw-h-4 tw-mr-2 tw-border-slate-200 tw-focus:bg-indigo-600'
                      />
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link href='/auth/ForgotPassword' className='tw-font-medium tw-text-indigo-600'>
                      Forgotten Password?
                    </Link>
                  </div>
                </div>
                <button
                  type='submit'
                  className='tw-w-full xl:tw-mt-[60px] tw-my-5 tw-py-3 tw-font-medium tw-text-white tw-bg-indigo-600 tw-hover:bg-indigo-500 tw-rounded-lg tw-border-indigo-500 tw-hover:shadow tw-inline-flex tw-space-x-2 tw-items-center tw-justify-center'
                  onClick={() => {
                    mixpanel.track('Submit', {
                      buttonName: 'Submit',
                      action: 'Log in(Submit user credentials)',
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
                  <span>Login</span>
                </button>
                <p className='tw-text-center tw-text-xs'>
                  Not registered yet?{' '}
                  <Link
                    href={`${redirectToken ? '/auth/signup?t=' + redirectToken : '/auth/signup'}`}
                    className='tw-text-indigo-600 tw-font-medium tw-inline-flex tw-space-x-1 tw-items-center'
                  >
                    <span
                      onClick={() => {
                        mixpanel.track('Registeration', {
                          buttonName: 'Register now',
                          action: 'Sign up Page',
                        })
                      }}
                    >
                      Register now{' '}
                    </span>
                    <ExternalLinkIcon className='currentColor'></ExternalLinkIcon>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}

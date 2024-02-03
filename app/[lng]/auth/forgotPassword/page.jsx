/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import InputLayout from '../../components/input'
import authenticator from '@/firebase/authenticator'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import logger from '@/logger'
import Image from 'next/image'

export default function ForgotPassword() {
  const [email, setEmail] = useState(''),
    [isEmailSent, setIsEmailSent] = useState(false),
    [isLoading, setIsLoading] = useState(false),
    router = useRouter()

  async function handleSubmit(evt) {
    evt.preventDefault()
    setIsLoading(true)
    try {
      await authenticator.requestPasswordReset(email)
      setIsEmailSent(true)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      alert('Instructions not sent please try again.')
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <p>Sending instructions....</p>
  }

  if (isEmailSent) {
    return (
      <div className='tw-flex tw-flex-col tw-gap-2 tw-items-center'>
        <h1 className='tw-underline tw-text-2xl tw-font-bold tw-uppercase tw-underline-offset-4 tw-mb-4'>
          Check your email
        </h1>
        <p className='tw-text-slate-100 tw-font-light'>We've emailed the password recovery instructions.</p>
        <Link href={'/auth/signin'} className='tw-bg-slate-500/40 tw-py-2 tw-px-4 tw-rounded-md'>
          back to login
        </Link>
      </div>
    )
  }

  return (
    <div className='tw-min-h-screen tw-flex tw-flex-col-reverse lg:tw-flex-row tw-justify-center tw-items-center tw-bg-gradient-to-r tw-from-pink-200 tw-to-teal-700 tw-w-full'>
      <div className='tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-4 lg:tw-px-8 tw-gap-1'>
        <h1 className='tw-text-black tw-font-extrabold tw-uppercase tw-text-3xl lg:tw-text-4xl'>Forgot password?</h1>
        <p className='tw-text-base lg:tw-text-lg tw-bg-gradient-to-r tw-from-gray-900 tw-to-gray-800 tw-bg-clip-text tw-font-extrabold tw-text-transparent'>
          To reset your password, enter your e-mail address below.
        </p>
        <div className='tw-w-full'>
          <input
            value={email}
            placeholder='Enter e-mail'
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            className='tw-text-black tw-p-3 tw-w-full tw-border-black tw-rounded-lg tw-mt-2'
          />
          <br></br>
          <button
            onClick={handleSubmit}
            className='tw-text-black tw-bg-lime-200 tw-rounded-lg tw-p-3 tw-transition hover:tw-bg-lime-300 tw-w-full tw-font-medium tw-hover:shadow tw-inline-flex tw-items-center tw-justify-center hover:tw-scale-105 tw-transition-all tw-duration-300 tw-my-2'
          >
            Reset Password <span className='tw-px-2 tw-font-black'> &#8594;</span>
          </button>
          <br></br>
          <button
            onClick={() => router.back()}
            className='tw-text-black tw-rounded-lg tw-outline tw-p-3 tw-w-full tw-font-medium tw-transition-colors tw-mt-2 hover:tw-text-white hover:tw-bg-black hover:tw-scale-105 tw-transition-all tw-duration-300'
          >
            <span className='tw-font-black'> &#8592;</span> Back
          </button>
        </div>
      </div>
      <Image
        src={'/forgot-password.png'}
        // width={500}
        // height={500}
        width={550}
        height={550}
        alt='Forgot Password Logo'
        className='tw-mx-auto lg:tw-mr-16 tw-hidden md:tw-block'
      />
    </div>
  )
}

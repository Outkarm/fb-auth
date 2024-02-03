'use client'

import { useAuthContext } from '@/app/[lng]/context/Auth.Context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ToggleQa from '../components/toggleQa'
import { FiUser } from 'react-icons/fi'
import Link from 'next/link'

export default function Dashboard() {
  const { user } = useAuthContext(),
    router = useRouter(),
    [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
    return
  }, [user])

  return (
    <>
      <div className='tw-flex tw-min-h-screen tw-flex-col tw-p-24 tw-gap-4 tw-bg-white'>
        {isLoading ? (
          <p>Signing you out...</p>
        ) : (
          <>
            {/* <h1 className="tw-font-bold tw-text-xl tw-underline tw-underline-offset-8">This is the dashboard.</h1> */}
            {/* <p className="tw-text-slate-300/60">Here's your email, <b className="tw-text-slate-400">{ user.email }</b></p> */}
            <div className='tw-grid sm:tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-20 tw-text-black tw-ml-20 tw-mr-20 tw-mt-5'>
              <div className='tw-mt-28 tw-mb-10'>
                <h1 className='tw-text-3xl tw-font-bold tw-mb-5'>Welcome Back</h1>
                <p className='tw-text-xl tw-mb-5'>
                  Checkout this betr beta benefits to manage
                  <br /> your software updates easily
                </p>
                <Link
                  className='tw-flex tw-gap-2 tw-px-7 tw-py-4 tw-rounded-3xl tw-bg-blue-500 tw-text-white'
                  href={'/dashboard/account'}
                >
                  <span>
                    <FiUser />
                  </span>
                  <p>My Account</p>
                </Link>
              </div>
              <div className='tw-grid tw-grid-cols-1 tw-gap-20'>
                <div className='tw-border tw-border-gray-50 tw-rounded-md tw-shadow tw-shadow-slate-300'>
                  <h1 className='tw-text-xl tw-font-bold tw-ml-5 tw-mb-3'>Streamline Team scheduling</h1>
                  <p className='tw-ml-5 tw-mr-5 tw-mb-3'>
                    start booking webinars, co-hosted meetings, or even round-robin events automatically, To get
                    started, simply invite team members to your account
                  </p>
                  <Link href={'/'} className='tw-ml-5 tw-font-bold tw-text-blue-500'>
                    Learn more about team scheduling
                  </Link>
                </div>
                <div className='tw-border tw-border-gray-50 tw-rounded-md tw-shadow tw-shadow-slate-300'>
                  <h1 className='tw-text-xl tw-font-bold tw-ml-5 tw-mb-3'>Avoid Cross-Calendar Conflicts</h1>
                  <p className='tw-ml-5 tw-mr-5 tw-mb-3'>
                    add up to 6 calendars business or personal and eliminate double booking with intelligent scheduling
                    that cross-checks all your calendars
                  </p>
                  <Link href={'/'} className='tw-ml-5 tw-font-bold tw-text-blue-500'>
                    Learn more about Calendars Connections
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

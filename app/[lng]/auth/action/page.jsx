'use client'

import PasswordReset from '@/app/[lng]/components/passwordReset'
import { useRouter, useSearchParams } from 'next/navigation'
import VerifyEmail from '@/app/[lng]/components/verifyEmail'
import { useEffect } from 'react'

export default function Actions() {
  const searchParams = useSearchParams(),
    mode = searchParams.get('mode'),
    oobCode = searchParams.get('oobCode'),
    router = useRouter()

  useEffect(() => {
    if (!mode) {
      router.push('/')
    }
  }, [])

  if (mode === 'verifyEmail') {
    return <VerifyEmail token={oobCode} />
  }

  if (mode === 'resetPassword') {
    return <PasswordReset token={oobCode} />
  }

  return <></>
}

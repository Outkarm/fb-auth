'use client'

import authenticator from '@/firebase/authenticator'
import { useEffect, useState } from 'react'
import logger from '@/logger'

export default function Account() {
  const [myRoles, setRoles] = useState([])
  useEffect(() => {
    authenticator
      .additionalUserInfo()
      .then((data) => {
        const { roles } = data
        setRoles(roles)
      })
      .catch((err) => {
        console.log('Error fetching roles', err)
      })

    return
  }, [])

  return (
    <>
      <div className='tw-flex tw-min-h-screen tw-flex-col tw-p-24 tw-gap-4 tw-bg-white'>
        <h1>These are all the roles you have:</h1>
        <ul className='tw-list-disc'>
          {myRoles &&
            myRoles.length > 0 &&
            myRoles.map((roles, idx) => {
              return <li key={idx}>{role}</li>
            })}
        </ul>
      </div>
    </>
  )
}

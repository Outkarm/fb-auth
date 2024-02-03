'use client'

import { useEffect } from 'react'

export default function QA() {
  useEffect(() => {
    Tally.loadEmbeds()
  }, [])
  return (
    <div className='tw-w-full tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center'>
      <button
        href=''
        onClick={() => {
          Calendly.initPopupWidget({ url: 'https://calendly.com/betrbeta-meet/30min' })
          return false
        }}
        className='tw-px-4 tw-py-3 tw-bg-slate-500 tw-rounded-md tw-leading-tight tw-fixed tw-top-5 tw-right-5'
      >
        Schedule a meeting
      </button>
      <section className='tw-p-4 tw-m-6 tw-bg-slate-500/10 tw-w-full'>
        <h1 className='tw-font-bold tw-text-lg tw-my-6 tw-mx-2'>Tell us a bit about your self</h1>
        <iframe
          data-tally-src='https://tally.so/embed/nWrvMN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
          loading='lazy'
          width='100%'
          height='1'
          frameBorder='0'
          marginheight='0'
          marginwidth='0'
          title='Tell us about yourself'
        ></iframe>
      </section>
    </div>
  )
}

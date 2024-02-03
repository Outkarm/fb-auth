'use client'
import React from 'react'
import { Splide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import ImgSlide from '../../components/ImgSlide'

export default function RootLayout({ children }) {
  return (
    <section className='tw-w-full tw-h-max tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-2'>
      <div className='tw-grid tw-grid-cols-1 lg:tw-grid-cols-5 tw-gap-y-4 md:tw-gap-0 tw-rounded-md '>
        {/* responsive xl */}
        <Splide
          options={{
            autoplay: true,
            type: 'loop',
            interval: 4000,
            pauseOnHover: false,
          }}
          className='lg:tw-col-span-3 slide-images-container tw-hidden lg:tw-justify-center xl:tw-flex'
        >
          <ImgSlide />
        </Splide>

        {/* responsive lg */}
        <Splide
          options={{
            autoplay: true,
            type: 'loop',
            interval: 4000,
            pauseOnHover: false,
          }}
          className='lg:tw-col-span-3 slide-images-container tw-hidden lg:tw-justify-center lg:tw-flex xl:tw-hidden'
        >
          <ImgSlide />
        </Splide>

        <div className='tw-px-0 tw-py-0 lg:tw-col-span-2 tw-flex tw-flex-col tw-text-center tw-mt-0 tw-mb-0 '>
          {children}
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import { SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'

const ImgSlide = () => {
  return (
    <>
      <SplideSlide className='tw-w-full tw-h-full'>
        <Image
          src='/img-auth-1.png'
          height={1000}
          width={1000}
          alt='Image 1'
          className='w-1/2 tw-object-cover tw-h-full tw-rounded-l-xl'
          onError={(e) => console.error('Image 1 Error:', e.nativeEvent)}
        />
      </SplideSlide>
      <SplideSlide>
        <Image
          src='/img-auth-2.png'
          width={1000}
          height={1000}
          alt='Image 2'
          className='tw-w-full tw-h-full tw-object-cover tw-top-0 tw-rounded-l-xl'
        />
      </SplideSlide>
      <SplideSlide>
        <Image
          src='/img-auth-3.png'
          width={1000}
          height={1000}
          alt='Image 3'
          className='tw-w-full tw-h-full tw-object-cover tw-top-0 tw-rounded-l-xl tw-bg-white/50'
        />
      </SplideSlide>
    </>
  )
}

export default ImgSlide

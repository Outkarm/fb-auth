'use client'

import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../globals.css'
import Nav from './(components)/Nav'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { dir } from 'i18next'
import { useTranslation } from 'app/i18n/client'
import { fallbackLng, languages } from 'app/i18n/settings'
import Script from 'next/script'


// export async function generateStaticParams() {
//     return languages.map((lng) => ({ lng }));
// }


export default function RootLayout({ children, params: { lng } }) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  const { t } = useTranslation(lng)

  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <Script src='https://www.googletagmanager.com/gtag/js?id=G-LXLERLB95Z' />
        <Script id='google-analytics'>
          {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-3629WFHKS9');
                    `}
        </Script>
        <title>Betr Beta</title>
        <meta name='description' content='Better software upgrade experiences' />
        <meta property='og:title' content='Betr Beta' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='https://i.ibb.co/MGTgSJF/BB.png' />
        <meta property='og:url' content='https://betrbeta.com/' />
        <meta property='og:description' content='Better software upgrade experiences.' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='sumonashimu59' />
        <meta name='twitter:image' content='https://i.ibb.co/hFXss3M/BB-1.png' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
      </head>

      <body className='flex flex-col min-h-screen'>
        

        <ChakraProvider theme={theme}>
          <main className={banner ? 'pt-48' : 'pt-16'}>{children}</main>
        </ChakraProvider>

        {/* Include the Tally widget script in the head section of your page */}

        <script src='https://tally.so/widgets/embed.js' async></script>
        <script src='https://static.elfsight.com/platform/platform.js' data-use-service-core defer></script>
        <script src='/api/calendlyWidget' type='text/javascript' async crossOrigin=''></script>
        <script async defer crossOrigin='anonymous' src='https://connect.facebook.net/en_US/sdk.js'></script>
      </body>
    </html>
  )
}

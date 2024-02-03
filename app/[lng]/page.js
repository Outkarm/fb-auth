'use client'

import '../globals.css'
import { useTranslation } from 'app/i18n/client'
import { fallbackLng, languages } from 'app/i18n/settings'
import 'react-circular-progressbar/dist/styles.css'


export default function App({ params: { lng } }) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  const { t } = useTranslation(lng)

  
  return (
    <>
    </>
  )
}

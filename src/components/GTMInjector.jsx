import { useEffect } from 'react'
import { useAdmin } from '../contexts/AdminContext'

export default function GTMInjector() {
  const { config } = useAdmin()

  // Google Tag Manager
  useEffect(() => {
    const id = config?.gtmId
    if (!id || document.getElementById('gtm-script')) return
    const s = document.createElement('script')
    s.id = 'gtm-script'
    s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`
    document.head.appendChild(s)
  }, [config?.gtmId])

  // Google Analytics 4
  useEffect(() => {
    const id = config?.ga4Id
    if (!id || document.getElementById('ga4-script')) return
    const s = document.createElement('script')
    s.id = 'ga4-script'
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(s)
    const s2 = document.createElement('script')
    s2.id = 'ga4-config'
    s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`
    document.head.appendChild(s2)
  }, [config?.ga4Id])

  // Facebook Pixel
  useEffect(() => {
    const id = config?.fbPixelId
    if (!id || document.getElementById('fb-pixel-script')) return
    const s = document.createElement('script')
    s.id = 'fb-pixel-script'
    s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`
    document.head.appendChild(s)
  }, [config?.fbPixelId])

  return null
}

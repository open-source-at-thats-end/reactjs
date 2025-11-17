import DetailPage from "../component/DetailPage";
import Providers from '../ThunkSlices/Providers';
import Script from 'next/script'
import '../styles/style.css'
import '../styles/propDetail.css'
import '../styles/global.css'
import "react-datetime/css/react-datetime.css";
import Head from 'next/head';
export default function RootLayout({children}) {

  return (
    <html lang="en">
      <head>
      <Head>
      <meta charSet="utf-8" />
      <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />
      </Head>
      <link  href="https://www.demosite.com/1161/m|common|flexslider|affix|property-detail|main|mortgage_calculator|fancybox/fcss.css" rel="stylesheet" media="screen, print"/>
      <link rel="preconnect" href="https://connect.facebook.net/" />
      {/* <link rel="shortcut icon" href="https://www.demosite.com/bcffbdeba/config/201711170113101526416390-favicon.png" type="image/png" /> */}
      <link rel="shortcut icon" href="      https://www.demosite.com/bcffbdeba/config/202505060630361747085936-favicon.png" type="image/png" />

      <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
      <link rel='preload' as='style' href='https://fonts.googleapis.com/css?family=Lato:400,300,700,900,400italic&display=swap'/> 
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Lato:400,300,700,900,400italic&display=swap' media=""/> 
      <link rel="dns-prefetch" href="https://www.googletagmanager.com/" />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true"/>

    
      <meta name="yandex-verification" content="06f253872fbbf843" />
      <meta name="msvalidate.01" content="6DCA6BC595924E01FCCF2FF1F90A0EC9" />
      <meta httpEquiv="content-type" content="text/html; charSet=utf-8" />
      <meta name="author" content="DemoSite"/>
      <meta name="referrer" content="always"/>
      <meta name="geo.region" content="US-FL" />
      <meta name="geo.placename" content="Fort Lauderdale" />
      <meta name="geo.position" content="26.184190;-80.172840" />
      <meta name="ICBM" content="26.184190;-80.172840" />
      
      <link
      rel='preload' 
      as='style'
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />

      <link
      rel='preload' 
      as='style'
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <link
      rel="stylesheet"
      type="text/css"
      charSet="UTF-8"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      media=""
      />
      <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      media=""
      />
      </head>
      <body>
     
    
    
      <Providers>
       {children}
      </Providers>
      
      <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var XHR_Url = 'https://www.demosite.com';
              var Site_Root = '';
            `,
          }}
        />

       
      <script id='fjs'  defer src="https://www.demosite.com/1161/cw|m|maskedinput|common-api|affix|fancybox/fjs.js"></script>
      </body>
    </html>
  )
}
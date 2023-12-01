import FooterSection from '@/Component/Footer/Footer';
import NavSection from '@/Component/NavSection/NavSection';
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"/>
    </Head>
      <Provider store={store}>
   
          
          <NavSection />
     
        {/* <div className="content"> */}
          <Component {...pageProps} />
        <FooterSection />
        {/* </div> */}
        {/* <div className="footer">
        </div> */}
      </Provider>
    </>
  )
}

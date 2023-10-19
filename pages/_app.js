import FooterSection from '@/Component/Footer/Footer';
import NavSection from '@/Component/NavSection/NavSection';
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <NavSection />
      <div className="content">
        <Component {...pageProps} />
      </div>
      <div className="footer">
        <FooterSection />
      </div>
    </>
  )
}

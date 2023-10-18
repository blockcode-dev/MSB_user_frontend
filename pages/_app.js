import FooterSection from '@/Component/Footer/Footer';
import NavSection from '@/Component/NavSection/NavSection';
import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.css";
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

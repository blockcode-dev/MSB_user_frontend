import Banner from '@/Component/Banner/Banner'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Home.module.css"
import Slider from 'react-slick';
import CardComponent from '@/Component/CardComponent/CardComponent';
import { Container } from 'react-bootstrap';
import Pic1 from "../../public/assets/card1.png"
import Pic2 from "../../public/assets/card2.png"
import Blogs from '@/Component/Blogs/Blogs';
import MsbLogo from "../../public/assets/msb.png"
import { getLocalStorageItem } from '@/Constants/Api/Api';
import Signin from '../signin';
import Image from 'next/image';
const Home = () => {
  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  });

  const storedValue = getLocalStorageItem("UserLoginToken");
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
      {isClient && storedValue ?
        <div className={styles.Home}>
          <Banner />
          {/* <Image src={MsbLogo} width={100} height={100}/> */}

          <div style={{ margin: "50px 0px" }}>

            <Blogs />

          </div>
        </div>
        : <Signin />}
    </>
  )
}
export default Home

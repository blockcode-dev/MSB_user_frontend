import React, { useEffect, useRef, useState } from 'react'
import styles from "./landing.module.scss"
import Image1 from "../../public/assets/landingpage1.png"
import Banner from '../Banner/Banner'
import Image from 'next/image'
import { Button, Container } from 'react-bootstrap'
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
const Landing = () => {
  const router =useRouter()
  const [isClient, setIsClient] = useState(false)
    console.log(router.asPath, "check path")
    useEffect(() => {
        setIsClient(true)
    }, [])
    const path = "https://node.mystorybank.info:4000/videos/Animated_Logo_mystorybank.mp4"
    const playerRef = useRef(null);

    const handleVideoEnd = () => {
        if (playerRef && playerRef.current) {
          const currentRef = playerRef.current;
          if (currentRef.seekTo) {
            currentRef.seekTo(0); // Seek to the beginning of the video
          }
          if (currentRef.play) {
            currentRef.play(); // Play the video again
          }
        }
      };

  return (
    <div className={styles.Landing} >
      {/* <Banner /> */}
      <div className={styles.Video_Banner}>

      {isClient &&
                <ReactPlayer
                ref={playerRef}
                url={path}
                onEnded={handleVideoEnd} // When the video ends, replay it
                // controls
                controls={false}
                    loop={false}
                    muted={true}
                    playing={true} // Autoplay the video
                    // style={{ width: "90%", margin: "20px auto" }} 
                    className={styles.video_banner_inner}
                    height="450px"
                    width="100%"
                    />}
                    </div>

      <Container className={styles.main}>
        <div className={styles.section1}>
          <div className={styles.imagesss}>
            <Image src={Image1} width={100} height={100} className={styles.Images} />
          </div>
          <div className={styles.content}>
            <h5>About Us</h5>
            <h3>We Provide You With The Benefits You Wouldn’t have Imagined</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi orci morbi lacus tellus eu in. Lorem tincidunt viverra volutpat platea et purus enim mollis habitant. Tincidunt nullam eget vel nisi. Lorem tincidunt viverra volutpat platea et purus enim mollis habitant. Tincidunt nullam eget vel nisi. Lorem tincidunt viverra volutpat platea et purus enim mollis habitant. Tincidunt nullam eget vel nisi.  Tincidunt nullam eget vel nisi. Lorem tincidunt viverra volutpat platea et purus enim mollis habitant. Tincidunt nullam eget vel nisi. </p>
            <Button className="button_theme" style={{ width: "20%" }} >Get Started</Button>
          </div>
        </div>
      </Container>
      <Container className={styles.main} style={{ padding: "0px 0px" }}>
        <div className={styles.section1}>
          <div className={styles.content}>
            <h5>About Us</h5>
            <h3>We Provide You With The Benefits You Wouldn’t have Imagined</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi orci morbi lacus tellus eu in. Lorem tincidunt viverra volutpat platea et purus enim mollis habitant. Tincidunt nullam eget vel nisi. Lorem tincidunt viverra volutpat platea et purus enim mollis habitant. Tincidunt nullam eget vel nisi. Lorem tincidunt viverra volutpat platea et purus enim mollis habitant. Tincidunt nullam eget vel nisi.  Tincidunt nullam eget vel nisi. Lorem tincidunt viverra volutpat platea et purus enim mollis habitant. Tincidunt nullam eget vel nisi. </p>
            <Button className="button_theme" style={{ width: "20%" }}>Get Started</Button>
          </div>
          <div className={styles.imagesss}>
            <Image src={Image1} width={100} height={100} className={styles.Images} />
          </div>
        </div>
      </Container>
    </div>
  )
}
export default Landing

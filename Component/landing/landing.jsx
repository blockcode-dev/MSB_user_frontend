import React from 'react'
import styles from "./landing.module.scss"
import Image1 from "../../public/assets/landingpage1.png"
import Banner from '../Banner/Banner'
import Image from 'next/image'
import { Button, Container } from 'react-bootstrap'
const Landing = () => {
  return (
    <div className={styles.Landing} >
      <Banner />
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

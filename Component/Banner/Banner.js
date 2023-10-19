import React from 'react'
import styles from "./Banner.module.scss"
import { Container } from 'react-bootstrap'
import BannerPic from "../../public/assets/banner.png"
import Image from 'next/image'
const Banner = () => {
    return (
        <Container fluid className={styles.Banner}>
            <Container className={styles.section1}>
                <div className={styles.left}>
                    <h3>Case Studies</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac, elit id suscipit vel. Amet et laoreet pharetra, est ipsum. Lorem integer vitae enim et. Tortor vestibulum maecenas cursus ac enim nibh mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac, elit id suscipit vel. Amet et laoreet pharetra, est ipsum. Lorem integer vitae enim et. Tortor vestibulum maecenas cursus ac enim nibh mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                </div>
                <div className={styles.right}>
                    <Image src={BannerPic} width={100} height={100} alt='picture' className={styles.picture} />
                </div>
            </Container>
        </Container>
    )
}

export default Banner

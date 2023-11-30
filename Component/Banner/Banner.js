import React from 'react'
import styles from "./Banner.module.scss"
import { Container } from 'react-bootstrap'
import BannerPic from "../../public/assets/msb.png"
import Image from 'next/image'
import { Image_URL } from '@/Constants/host'
const Banner = (props) => {
    console.log(props, "props")
    return (
        <Container fluid className={styles.Banner}>

            <Container className={styles.section1}>
                <div className={styles.left}>
                    <h1 style={{ textTransform: "capitalize" }}>{props.title===undefined?"My Stories":props.title}</h1>
                    <p>MSB is a data bank of stories for the storyteller in you. MSB provides you with a categorized list of stories to help take your audience to a place they can’t go on their own. MSB puts at your fingertips over 130 messages to empower, inspire and transform an audience experience <div> Everyone loves a good story. Storytelling is a critical, but often overlooked, skill every business owner should have.</div></p>
                </div>
                <div className={styles.right}>
                    <Image src={props.uri === null|| props.uri === ''||props.uri===undefined? BannerPic : `${Image_URL}${props.uri}`} width={100} height={100} alt='picture' className={styles.picture} />
                </div>
            </Container>
        </Container>
    )
}

export default Banner

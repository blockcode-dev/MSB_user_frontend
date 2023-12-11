import React, { useEffect, useState } from 'react'
import styles from "./Footer..module.scss"
import { Container } from 'react-bootstrap'
// import { AiFillFacebook, AiOutlineTwitter, AiFillYoutube } from "react-icons/ai"
// import { BsVimeo } from "react-icons/bs"
// import { FaQuestionCircle } from "react-icons/fa"
import { FooterContentApi } from '@/Constants/Api/Api'
import Link from 'next/link'
import { Image_URL } from '@/Constants/host'
import Image from 'next/image'
const FooterSection = () => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const [social, setSocial] = useState()
    const currentYear = new Date().getFullYear();
    useEffect(() => {
        FooterContentApi().then((res) => {
            setSocial(res.data)
        }).catch((error) => {
            console.log(error, "error in footer")
        })
    }, [])
    return (
        <div className={styles.FooterSection}>
            <Container className={styles.footer_inner}>
                <div className={`${styles.sec1} ${styles.desktopSec1}`}>
                    <p>© {currentYear} MyStoryBank. All rights reserved.</p>
                </div>
                <div className={styles.sec1}>
                    <h5>MyStoryBank</h5>
                </div>
                <div className={styles.sec1}>
                    {social?.map((item, index) => {
                        return (
                            <Link href={`${item?.redirection_url}`} key={index}>
                                <Image src={`${Image_URL}${item?.file_name}`} width={20} height={20} />
                            </Link>
                        )
                    })}
                </div>
                <div className={styles.mobileSec1}>
                    <p>© {currentYear} MyStoryBank. All rights reserved.</p>
                </div>
            </Container>
        </div>
    )
}
export default FooterSection

import React from 'react'
import styles from "./Footer..module.scss"
import { Container } from 'react-bootstrap'
import { AiFillFacebook, AiOutlineTwitter, AiFillYoutube } from "react-icons/ai"
import { BsVimeo } from "react-icons/bs"
import { FaQuestionCircle } from "react-icons/fa"
const FooterSection = () => {
  const currentYear = new Date().getFullYear();

    return (
        <div className={styles.FooterSection}>
            <Container className={styles.footer_inner}>
                <div className={styles.sec1}>
                    <p>© {currentYear} My Story Bank. All rights reserved.</p>
                </div>
                <div className={styles.sec1}>
                    <h5>My Story Bank</h5>
                </div>  <div className={styles.sec1}>

                    <AiFillFacebook size={25} className={styles.icon} />
                    <AiOutlineTwitter size={25} className={styles.icon} />
                    <BsVimeo size={25} className={styles.icon} />
                    <AiFillYoutube size={25} className={styles.icon} />
                    <FaQuestionCircle size={25} className={styles.icon} />

                </div>
            </Container>
        </div>
    )
}
export default FooterSection

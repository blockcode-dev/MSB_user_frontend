import React from 'react'
import {Container } from 'react-bootstrap'
import styles from "./otp.module.scss"
import Link from 'next/link'
import OtpStep from '@/Component/OtpStep/OtpStep'
import { useRouter } from 'next/router'
import Image from 'next/image'
const Otp = () => {
    const router =useRouter()
    return (
        <Container className={styles.Otp}>
            <div className={styles.Main} >
                <div className={styles.Left}>
                <Image src="http://localhost:3000/_next/static/media/msb.cd57a8cd.png" width={50} height={50} style={{ cursor: "pointer" ,width:"100%" ,height:"100%"}} alt='' />

                </div>
                <div className={styles.Right}>
                    <div className={styles.form_inner}>
                        <h1>Sign up</h1>
                        <OtpStep/>
                    </div>
                    <p className={styles.buttom_text}>Already have an account? <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                        const path = "/signin"
                        router.push(path)
                    }} >
                        Sign in
                    </span>
                    </p>
                </div>
            </div>
        </Container>
    )
}
export default Otp

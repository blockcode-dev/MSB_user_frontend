import React from 'react'
import {Container } from 'react-bootstrap'
import styles from "./otp.module.scss"
import Link from 'next/link'
import ForgotPassword from '@/Component/Forgot/forgotPassword'
const Otp = () => {
    return (
        <Container className={styles.Otp}>
            <div className={styles.Main} >
                <div className={styles.Left}>
                </div>
                <div className={styles.Right}>
                    <div className={styles.form_inner}>
                        <h1>Sign up</h1>
                        <ForgotPassword/>
                    </div>
                    <p className={styles.buttom_text}>Already have an account? <Link href="">
                        Sign in
                    </Link>
                    </p>
                </div>
            </div>
        </Container>
    )
}
export default Otp

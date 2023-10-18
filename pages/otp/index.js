import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from "./otp.module.scss"
import Link from 'next/link'

const Otp = () => {
    return (
        <Container className={styles.Otp}>
            <div className={styles.Main} >
                <div className={styles.Left}>

                </div>
                <div className={styles.Right}>
                    <div className={styles.form_inner}>

                        <h1>Sign up</h1>
                        <Form >

                            <Form.Group className="mb-3">
                                <Form.Label>OTP</Form.Label>
                                <Form.Control type="number" placeholder="Enter otp" />
                            </Form.Group>
<p>Resend OTP</p>
                        </Form>
                        <Button className="button_theme">Continue</Button>
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

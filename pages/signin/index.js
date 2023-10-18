import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from "./signin.module.scss"
import Link from 'next/link'

const Signin = () => {
    return (
        <Container className={styles.Signin}>
            <div className={styles.Main} >
                <div className={styles.Left}>

                </div>
                <div className={styles.Right}>
                    <div className={styles.form_inner}>

                        <h1>Sign up</h1>
                        <Form >

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="passsword" placeholder="Enter your password" />
                            </Form.Group>
                            <p>Forgot pasword?</p>
                        </Form>

                        <Button className="button_theme">Sign in</Button>
                    </div>


                </div>
            </div>
        </Container>
    )
}

export default Signin

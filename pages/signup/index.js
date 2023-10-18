import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from "./signup.module.scss"
import Link from 'next/link'

const SignUp = () => {
    return (
        <Container className={styles.Signup}>
            <div className={styles.Main} >
                <div className={styles.Left}>

                </div>
                <div className={styles.Right}>
                    <div className={styles.form_inner}>

                        <h1>Sign up</h1>
                        <Form >
                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your full Name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="number" placeholder="Enter your number" />
                            </Form.Group>  <Form.Group className="mb-3">
                                <Form.Label>Business Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Business Name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password </Form.Label>
                                <Form.Control type="password" placeholder="Enter Passsword" />
                            </Form.Group> <Form.Group className="mb-3">
                                <Form.Label>Confirm Passsword</Form.Label>
                                <Form.Control type="password" placeholder="Enter confirm paassword" />
                            </Form.Group>
                            
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

export default SignUp

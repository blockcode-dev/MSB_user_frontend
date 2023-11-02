import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from "./signin.module.scss"
import Link from 'next/link'
import { UserLoginAPI } from '@/Constants/Api/Api'
import { useRouter } from 'next/router'
import { useState } from 'react'
const Signin = () => {
    const router = useRouter();
    const navigate = router.replace;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        UserLoginAPI(
            email,
            password
        )
            .then((res) => {
                const token = res.data.data.tokens.access.token;
                localStorage.removeItem("UserLoginToken");
                localStorage.setItem("UserLoginToken", token);
                navigate("/home")
            })
            .catch((error) => {
                console.log(error, "error");
            });
    };
    return (
        <Container className={styles.Signin}>
            <div className={styles.Main} >
                <div className={styles.Left}>
                </div>
                <div className={styles.Right}>
                    <div className={styles.form_inner}>
                        <h1>Sign In</h1>
                        <Form >
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <p onClick={() => {
                        const path = "/forgotpassword"
                        router.push(path)
                    }} style={{cursor:"pointer"}} >Forgot pasword?</p>
                        </Form>
                        <Button className="button_theme" onClick={handleSubmit}>Sign in</Button>
                    </div>
                    <p className={styles.buttom_text}>Don’t have an account? <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                        const path = "/signup"
                        router.push(path)
                    }} >
                        Sign Up
                    </span>
                    </p>
                </div>
            </div>
        </Container>
    )
}
export default Signin

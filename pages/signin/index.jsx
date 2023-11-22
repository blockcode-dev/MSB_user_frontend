import React from 'react'
import { Button, Container, Form, Image } from 'react-bootstrap'
import styles from "./signin.module.scss"
import Link from 'next/link'
import { UserLoginAPI, getLocalStorageItem } from '@/Constants/Api/Api'
import { useRouter } from 'next/router'
import { useState } from 'react'
import DescriptionAlerts from '@/Constants/alert/alert'
import { useDispatch } from 'react-redux'
import { getClinetProfile } from '@/redux/getClientProfileSlice'
import MsbLogo from "/public/assets/msb.png"
const Signin = () => {
    const router = useRouter();
    const navigate = router.replace;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        text: "",
    });
    const dispatch = useDispatch()
    const storedValue = getLocalStorageItem("UserLoginToken");

    const handleSubmit = (event) => {
        setAlert(false);
        UserLoginAPI(
            email,
            password
        )
            .then((res) => {
                console.log(res, "response")
                if (res.data === 200 || res.data.status === 200) {
                    setAlert(true);
                    setAlertConfig({
                        text: "Congratulations! You have successfully logged in.",
                        icon: "success",
                    });
                    setTimeout(() => {
                        dispatch(getClinetProfile(storedValue))
                        const token = res.data.data.tokens.access.token;
                        localStorage.removeItem("UserLoginToken");
                        localStorage.setItem("UserLoginToken", token);
                        navigate("/home")
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log(error, "error")
                if (error.response.data.status === 401 || error.response.data.status === 400) {
                    setAlert(true);
                    setAlertConfig({
                        text: error.response.data.message,
                        icon: "error",
                    });
                    setTimeout(() => {
                    }, 1000);
                }
                console.log(error, "error");
            });
    };
    return (<>
        {alert ? (
            <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
        ) : null}
        <Container className={styles.Signin}>
            <div className={styles.Main} >
                <div className={styles.Left}>
                    <Image src="http://localhost:3000/_next/static/media/msb.cd57a8cd.png" width={50} height={50} style={{ cursor: "pointer" ,width:"100%" ,height:"100%"}} alt='' />
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
                            }} style={{ cursor: "pointer" }} >Forgot pasword?</p>
                        </Form>
                        <Button className="button_theme" onClick={handleSubmit} style={{ width: "100%" }}>Sign in</Button>
                    </div>
                    <p className={styles.buttom_text}>Don’t have an account? <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                        const path = "/otp"
                        router.push(path)
                    }} >
                        Sign Up
                    </span>
                    </p>
                </div>
            </div>
        </Container>
    </>
    )
}
export default Signin

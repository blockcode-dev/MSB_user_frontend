import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from "./signup.module.scss"
import Link from 'next/link'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useState } from 'react'
import { UserRagisterAPI } from '@/Constants/Api/Api'
import { useRouter } from 'next/router'
const SignUp = () => {
    const router = useRouter();
    const navigate = router.replace;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handlePhoneChange = (newPhone) => {
        setMobile(newPhone);
    };
    const handleSubmit = (event) => {
        // if (!agree) {
        //   setAlert(true);
        //   setAlertConfig({
        //     text: "Please agree to the terms and conditions to submit the form.",
        //     icon: "info",
        //   });
        //   setTimeout(() => {
        //     setAlert(false);
        //   }, 7000);
        //   return;
        // }
        // const getToken = localStorage.getItem("UserOtpToken");
        // event.preventDefault();
        // const formDataImage = new FormData();
        // formDataImage.append("image", selectedImage);
        // if (setIsLoading === true) {
        //   setAlertConfig({
        //     text: "Your request is Submitted Please Wait for response",
        //     icon: "success",
        //   });
        // }
        UserRagisterAPI(
            name,
            email,
            mobile,
            password,
            confirmPassword
        )
            .then((res) => {
                navigate("/signin")
                // if (res.data === 200 || res.data.status === 200) {
                //   setAlert(true);
                //   setAlertConfig({
                //     text: "Thankyou for choosing AdvoLive! You are Registered Successfully",
                //     icon: "success",
                //   });
                //   setTimeout(() => {
                //     navigate("/login");
                //   }, 3000);
                //   setIsLoading(false);
                // }
                // if (
                //   res.data.status === 400 &&
                //   res.data.error === "The image failed to upload."
                // ) {
                //   setAlert(true);
                //   setAlertConfig({
                //     text: "Please Upload Again Image",
                //     icon: "error",
                //   });
                //   setIsLoading(false);
                // }
            })
            .catch((error) => {
                console.log(error, "error");
                // setIsLoading(false);
                // if (error.response.status === 500) {
                //   setAlert(true);
                //   setAlertConfig({
                //     text: "Internal Server Error Please Try After Some Time ",
                //     icon: "warning",
                //   });
                //   setTimeout(() => {
                //     setAlert(false);
                //     navigate("/send/otp");
                //   }, 4000);
                // }
                // if (error.response.status === 400) {
                //   setAlert(true);
                //   setAlertConfig({
                //     text: "We apologize, the form submission was unsuccessful. Kindly attempt the submission again !!",
                //     icon: "info",
                //   });
                //   setTimeout(() => {
                //     setAlert(false);
                //     navigate("/send/otp");
                //   }, 4000);
                // }
            });
    };
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
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <PhoneInput
                                    country={'us'}
                                    value={mobile}
                                    onChange={handlePhoneChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password </Form.Label>
                                <Form.Control type="password" placeholder="Enter Passsword" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group> <Form.Group className="mb-3">
                                <Form.Label>Confirm Passsword</Form.Label>
                                <Form.Control type="password" placeholder="Enter confirm paassword" value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <Button className="button_theme" onClick={handleSubmit}>Continue</Button>
                    </div>
                    <p className={styles.buttom_text}>Already have an account? <span style={{color:"blue",textDecoration:"underline",cursor:"pointer"}} onClick={() => {
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
export default SignUp

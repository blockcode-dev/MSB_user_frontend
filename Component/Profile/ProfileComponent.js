import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from "./Profile.module.scss"
import Image from 'next/image'
import Picture from "../../public/assets/picture.png"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
const ProfileComponent = () => {
    const [value, setValue] = useState("edit")
    const handleValueChangeEdit = () => {
        setValue("edit")
    }
    const handleValueChangePassword = () => {
        setValue("change_password")
    }
    console.log(value, "checkl")
    return (
        <Container className={styles.profile}>
            <div className={styles.profile_inner}>
                <div className={styles.section1}>
                    <div>
                        <Image src={Picture} width={100} height={100} className={styles.Picture} />
                    </div>
                    <div>
                        <h5>Bhavya Soni</h5>
                        <h6>Set up your My Story Bank account.</h6>
                    </div>
                </div>
                <div className={styles.section2}>
                    <div className={styles.btn_tab}>
                        <Button className={styles.btn_theme_div} style={{ backgroundColor: value === "edit" ? "#174F78" : "unset", color: value === "edit" ? "white" : "unset" }}
                            onClick={handleValueChangeEdit}>Edit</Button>
                        <Button className={styles.btn_theme_div} style={{ backgroundColor: value === "change_password" ? "#174F78" : "unset", color: value === "change_password" ? "white" : "unset" }} onClick={handleValueChangePassword}>Change Password</Button>
                    </div>
                    <div className={styles.line}>
                    </div>
                    <div className={styles.Form_ctm}>
                        {value === "edit" ?
                            <div>
                                <Form>
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
                                <div style={{ display: "flex", margin: "100px 0px" }}>
                                    <Button className="button_theme" style={{ margin: "10px 5px", width: "28%" }}>Cancle</Button>
                                    <Button className="button_theme" style={{ margin: "10px 5px", width: "70%" }}>Update
                                    </Button>
                                </div>
                            </div>
                            :
                            <div>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Old Password </Form.Label>
                                        <Form.Control type="password" placeholder="Enter Passsword" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>New Password </Form.Label>
                                        <Form.Control type="password" placeholder="Enter Passsword" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Passsword</Form.Label>
                                        <Form.Control type="password" placeholder="Enter confirm paassword" />
                                    </Form.Group>
                                </Form>
                                <div style={{ display: "flex", margin: "100px 0px" }}>
                                    <Button className="button_theme" style={{ margin: "10px 5px", width: "28%" }}>Cancle</Button>
                                    <Button className="button_theme" style={{ margin: "10px 5px", width: "70%" }}>Change Password
                                    </Button>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default ProfileComponent

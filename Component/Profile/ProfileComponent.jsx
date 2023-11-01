import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from "./Profile.module.scss"
import Image from 'next/image'
import Picture from "../../public/assets/picture.png"
import 'react-phone-input-2/lib/style.css'
import { useEffect } from 'react'
import { ChangePasswordAPI, GetProfile, UserEditProfileAPI } from '@/Constants/Api/Api'
import PhoneInput from 'react-phone-input-2'
import { useDispatch, useSelector } from 'react-redux'
import { getClinetProfile } from '@/redux/getClientProfileSlice'
import { Image_URL } from '@/Constants/host'
const ProfileComponent = () => {
    const ProfileGet = useSelector((state) => state.rootReducer.clientProfile.clientProfile
    )
    const [selectedImage, setSelectedImage] = useState("");
    const [name, setName] = useState(ProfileGet?.name);
    const [mobile, setMobile] = useState(ProfileGet?.mobile || "")
    const [value, setValue] = useState("edit")
    const [old_password, setOldPassword] = useState();
    const [new_password, setNewPassword] = useState()
    const [new_c_password, setNewCPassword] = useState()
    const handleValueChangeEdit = () => {
        setValue("edit")
    }
    const handleValueChangePassword = () => {
        setValue("change_password")
    }
    const handlePhoneChange = (newPhone) => {
        // setMobile(res.data.data.mobile_number)
        setMobile(newPhone);
    };
    // useEffect(() => {
    //     GetProfile().then((res) => {
    //         console.log(res,"response")
    //     }).catch((error) => {
    //         console.log(error, "error")
    //        
    //     })
    // }, [])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getClinetProfile());
    }, [dispatch])

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("image", selectedImage);
        UserEditProfileAPI(name, selectedImage, mobile)
            .then((res) => {
                // dispatch(getClinetProfile());
            })
            .catch((error) => {
                console.log(error)
            });
    };
    const handleChangePassword = () => {
        ChangePasswordAPI(old_password, new_password, new_c_password).then((res) => {
        }).catch((error) => {
            console.log(error)
        })
    }
    // const Imagesurl = Image_URL + ProfileGet?.attachements[0]?.file_name
    // console.log(ProfileGet?.attachements[0]?.file_name)
    return (
        <Container className={styles.profile}>
            <div className={styles.profile_inner}>
                <div className={styles.section1}>
                    <div>
                        {/* <Image src={Picture} width={100} height={100} className={styles.Picture} alt='' /> */}
                        {/* <Image src={`Imagesurl`} width={100} height={100} className={styles.Picture} /> */}
                        {/* <img
                            width={100} height={100}
                            alt="images"
                            className={styles.Picture}
                            src={Imagesurl}
                        /> */}
                    </div>
                    <div>
                        <h5>{ProfileGet.name}</h5>
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
                                    <div className={styles.profiletop}>
                                        {selectedImage === "" ? (
                                            <img
                                                src='https://www.vhv.rs/dpng/d/425-4254086_circle-gray-circulo-png-forma-grey-circle-png.png'
                                                height="50px"
                                                width="50px"
                                                alt="profile-pic"
                                                style={{ borderRadius: "100px" }}
                                            />
                                        ) : (
                                            selectedImage && (
                                                <img
                                                    src={URL.createObjectURL(selectedImage)}
                                                    height="50px"
                                                    width="50px"
                                                    alt="Profile Pic"
                                                    style={{ borderRadius: "50px" }}
                                                />
                                            )
                                        )}
                                        <label className="custom-file-upload">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="image"
                                                onChange={(e) => {
                                                    setSelectedImage(e.target.files[0]);
                                                }}
                                                style={{ cursor: "pointer" }}
                                            />
                                            &nbsp; Add Profile picture
                                        </label>
                                    </div>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your full Name" value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter your email" value={ProfileGet.email} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
                                        {/* <Form.Control type="number" placeholder="Enter your number" /> */}
                                        <PhoneInput
                                            country={'us'}
                                            value={mobile}
                                            onChange={handlePhoneChange}
                                        />
                                    </Form.Group>
                                </Form>
                                <div style={{ display: "flex", margin: "100px 0px" }}>
                                    <Button className="button_theme" style={{ margin: "10px 5px", width: "28%" }}>Cancle</Button>
                                    <Button className="button_theme" style={{ margin: "10px 5px", width: "70%" }} onClick={handleSubmit}>Update
                                    </Button>
                                </div>
                            </div>
                            :
                            <div>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Old Password </Form.Label>
                                        <Form.Control type="password" placeholder="Enter Passsword" value={old_password}
                                            onChange={(e) => setOldPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>New Password </Form.Label>
                                        <Form.Control type="password" placeholder="Enter Passsword" value={new_password}
                                            onChange={(e) => setNewPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Passsword</Form.Label>
                                        <Form.Control type="password" placeholder="Enter confirm paassword" value={new_c_password}
                                            onChange={(e) => setNewCPassword(e.target.value)} />
                                    </Form.Group>
                                </Form>
                                <div style={{ display: "flex", margin: "100px 0px" }}>
                                    <Button className="button_theme" style={{ margin: "10px 5px", width: "28%" }}>Cancle</Button>
                                    <Button className="button_theme" style={{ margin: "10px 5px", width: "70%" }} onClick={handleChangePassword}>Change Password
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

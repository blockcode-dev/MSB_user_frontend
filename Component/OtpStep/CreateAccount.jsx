import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./OtpStep.module.scss";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { UserRegisterAPI } from "@/Constants/Api/Api";
import DescriptionAlerts from "@/Constants/alert/alert";
import { useRouter } from "next/router";
const CreateAccount = ({ formData, setFormData }) => {
  const router = useRouter();
  const navigate = router.replace;
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePhoneChange = (newPhone) => {
    setMobile(newPhone);
  };
  const [alert, setAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
  });
  const handleCreateAccount = (event) => {
    setAlert(false);
    // if (!agree) {
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
    UserRegisterAPI(
      name,
      formData.email,
      mobile,
      password,
      confirmPassword
    )
      .then((res) => {
        console.log(res, "res")
        if (res.data === 200 || res.data.status === 200) {
          setAlert(true);
          setAlertConfig({
            text: "User Created Successfully. Please Continue Your Journey",
            icon: "success",
          });
          setTimeout(() => {
            navigate("/signin")
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error, "error");
        if (error.response.status === 400) {
          setAlert(true);
          setAlertConfig({
            text: error.response.data.message,
            icon: "info",
          });
          setTimeout(() => {
            setAlert(false);
            // navigate("/send/otp");
          }, 4000);
        }
      });
  };
  return (<>
    {alert ? (
      <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
    ) : null}
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
        <Form style={{ textAlign: "left" }}>
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
            <Form.Control type="email" placeholder="Enter your email"
              value={formData.email}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <PhoneInput
              country={'us'}
              value={mobile}
              onChange={handlePhoneChange}
              disableDropdown={true}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password </Form.Label>
            <Form.Control type="password" placeholder="Enter Passsword" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Passsword</Form.Label>
            <Form.Control type="password" placeholder="Enter confirm paassword" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>
        </Form>
        <Button className="button_theme" onClick={handleCreateAccount}>Continue</Button>
      </div>
    </div>
  </>
  );
};
export default CreateAccount;

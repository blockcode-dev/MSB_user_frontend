import React from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import styles from "./signin.module.scss";
import Link from "next/link";
import { UserLoginAPI } from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import { useState } from "react";
import DescriptionAlerts from "@/Constants/alert/alert";
import { useDispatch } from "react-redux";
import { getClinetProfile } from "@/redux/getClientProfileSlice";
import Logo from "../../public/assets/msb.png"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ImagesCom from "@/Component/images";
const Signin = () => {
  const router = useRouter();
  const navigate = router.replace;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
  });
  const dispatch = useDispatch();

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.trim() === '') {
      setEmailError('');
    } else if (!emailRegex.test(input)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    validateEmail(inputEmail);
  };

  const handleSubmit = (event) => {
    UserLoginAPI(email, password)
      .then((res) => {
        console.log(res, "response");
        if (res.data === 200 || res.data.status === 200) {
          setAlert(true);
          setAlertConfig({
            text: "Congratulations! You have successfully logged in.",
            icon: "success",
          });
          setTimeout(() => {
            dispatch(getClinetProfile());
            const token = res.data.data.tokens.access.token;
            localStorage.removeItem("UserLoginToken");
            localStorage.setItem("UserLoginToken", token);
            navigate("/home");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error, "error");
        if (
          error.response.data.status === 401 ||
          error.response.data.status === 400
        ) {
          setAlert(true);
          setAlertConfig({
            text: error.response.data.message,
            icon: "error",
          });
          setTimeout(() => {
            setAlert(false)
          }, 500);
        }
        console.log(error, "error");
      });
  };

  const handleShowPass = () => setShowPassword((showPassword) => !showPassword);

  const handleMouseDownPass = (event) => {
    event.preventDefault();
  };
  console.log("hello")
  return (
    <>
      {alert ? (
        <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
      ) : null}
      <Container className={styles.Signin}>
        <div className={styles.Main}>
          <div className={styles.Left}>
            {/* <Image
              src={MsbLogo}
              width={50}
              height={50}
              style={{ cursor: "pointer", width: "100%", height: "100%" }}
              alt=""
            /> */}
            {/* <Image src={Logo} width={50} height={50} style={{ cursor: "pointer" }} alt='' className={styles.logo} /> */}
<ImagesCom/>
          </div>
          <div className={styles.Right}>
            <div className={styles.form_inner}>
              <h1>Sign In</h1>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && <p className={styles.error_message}>{emailError}</p>}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className={styles.input_container}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="eyesHidden">
                      <p
                        onClick={handleShowPass}
                        onMouseDown={handleMouseDownPass}
                      >
                        {showPassword ? (
                          <AiFillEye size={25} />
                        ) : (
                          <AiFillEyeInvisible size={25} />
                        )}
                      </p>
                    </span>
                  </div>
                </Form.Group>
                <p
                  onClick={() => {
                    const path = "/forgotpassword";
                    router.push(path);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Forgot pasword?
                </p>
              </Form>
              <Button 
                className="button_theme"
                onClick={handleSubmit}
                style={{ width: "100%" }}
                >
                Sign in
              </Button>
            </div>
            <p className={styles.buttom_text}>
              Don’t have an account?{" "}
              <span
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const path = "/otp";
                  router.push(path);
                }}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Signin;

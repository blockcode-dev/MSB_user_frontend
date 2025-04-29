import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import styles from "./signin.module.scss";
import Link from "next/link";
import { UserLoginAPI } from "@/Constants/Api/Api";
import { useRouter } from "next/router";
import DescriptionAlerts from "@/Constants/alert/alert";
import { useDispatch } from "react-redux";
import { getClinetProfile } from "@/redux/getClientProfileSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ImagesCom from "@/Component/images";
import { message } from "antd";

const Signin = () => {
  const router = useRouter();
  const navigate = router.replace;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ text: "" });
  const [loading, setLoading] = useState(false);  // Loading state
  const dispatch = useDispatch();

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.trim() === "") {
      setEmailError("");
    } else if (!emailRegex.test(input)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    validateEmail(inputEmail);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);  // Call the submit function when Enter key is pressed
    }
  };

  const handleSubmit = (event) => {
    event?.preventDefault();
    setLoading(true);  // Set loading to true when request starts
    UserLoginAPI(email, password)
      .then((res) => {
        setLoading(false);  // Set loading to false once response is received
        if (res.data === 200 || res.data.status === 200) {
         message.success("Congratulations! You have successfully logged in.")
          setTimeout(() => {
            dispatch(getClinetProfile());
            const token = res.data.data.tokens.access.token;
            localStorage.removeItem("UserLoginToken");
            localStorage.setItem("UserLoginToken", token);
            navigate("/story/all");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error,"error")
        setLoading(false);  // Set loading to false if there's an error
       message.error(error?.response?.data?.message)
        console.log(error, "error");
      });
  };

  const handleShowPass = () => setShowPassword((prev) => !prev);
  const handleMouseDownPass = (event) => event.preventDefault();

  return (
    <>
      {alert && (
        <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
      )}
      <Container className={styles.Signin}>
        <div className={styles.Main}>
          <div className={styles.Left}>
            <ImagesCom />
          </div>
          <div className={styles.Right}>
            <div className={styles.form_inner}>
              <h1>Sign In</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    onKeyDown={keyPressHandler}  // Bind keyPressHandler to email input
                  />
                  {emailError && (
                    <p className={styles.error_message}>{emailError}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className={styles.input_container}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={keyPressHandler}  // Bind keyPressHandler to password input
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
                  onClick={() => router.push("/forgotpassword")}
                  style={{ cursor: "pointer", padding: "10px 0px" }}
                >
                  Forgot password?
                </p>

                <Button
                  className="button_theme"
                  type="submit"
                  style={{ width: "100%" }}
                  disabled={loading}  // Disable button when loading
                >
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </Form>

              <p
                className={styles.buttom_text}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() =>
                  router.push(
                    "https://transactions.sendowl.com/products/78271145/4A5919F0/view"
                  )
                }
              >
                Subscribe to create an account
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signin;

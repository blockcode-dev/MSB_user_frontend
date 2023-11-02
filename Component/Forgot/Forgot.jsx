import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Forgot.scss";
const Forgot = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [activeUsername, setActiveUsername] = useState(true);
  // const [activeOtp, setActiveOtp] = useState("");
  // const [activePassword, setActivePassword] = useState("");
  // const [submit, setsubmit] = useState(true);
  useEffect(() => {}, []);
  // console.log("username", username, otp, password, confirmPassword);

  return (
    <div className="forgot_form">
      <div className="forgot_form_container">
        <Form>
          <Form.Group className="input_field">
          
            <Form.Control
              type="text"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="input_field">
            <Form.Control
              type="number"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="input_field">
            <Form.Control
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="input_field">
            <Form.Control
              type="password"
              placeholder=" Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Form>

        <Button
          className="forgot_form_button"
          size="sm"
          // onClick={() => alert("submmitted")}
          // disabled={submit}
        >
          <h6>Proceed</h6>
        </Button>

        <div className="forgot_form_bottom">
          <h5>Already have an Account.</h5>
          <h5>
            <Link to="/login/" className="link">
              Sign In
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Forgot;

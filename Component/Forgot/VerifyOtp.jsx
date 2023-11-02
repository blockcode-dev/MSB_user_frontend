import React from "react";
import { useEffect } from "react";
// import { useState } from "react";
import { Form } from "react-bootstrap";
import "./Forgot.scss";
import {Email} from '@material-ui/icons'
import {Password} from '@mui/icons-material'
const VerifyOtp = ({ formData, setFormData }) => {
//   const [username, setUsername] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
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
          <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder={formData.username}
              disabled
            />
          </Form.Group>
          <Form.Group className="input_field">
          <Form.Label>OTP</Form.Label>
            <Form.Control
              type="number"
              placeholder="OTP"
              value={formData.otp}
              onChange={(e) => {
                setFormData({ ...formData, otp: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="input_field">
          <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="New Password"
              disabled
            />
          </Form.Group>
          <Form.Group className="input_field">
          <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder=" Confirm New Password"s
              disabled
            />
          </Form.Group>
        </Form>
{/* 
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
            <Link to="/login" className="link">
              Sign In
            </Link>
          </h5>
        </div> */}
      </div>
    </div>
  );
};

export default VerifyOtp;

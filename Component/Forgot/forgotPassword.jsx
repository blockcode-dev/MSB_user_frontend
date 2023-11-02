import * as React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import DescriptionAlerts from "../../Constants/alert/alert";
import { ForgotPasswordApi, ResetPasswordApi, VerifyOtpAPI } from "../../Constants/Api"
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function ForgotPassword() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formData, setFormData] = useState({
    username: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
  });

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const navigate = useNavigate();
  const Navigation = useCallback(() => {
    let value = "/login/";
    navigate(value);
  }, [navigate]);

  const handleVerifyOTP = () => {
    VerifyOtpAPI(formData.username, formData.otp)
      .then((res) => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
        setShowAlert(true);
        setAlertConfig({
          type: "info",
          text: "Your OTP Is Varified Please Enter Your Now Password",
        });
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
      })
      .catch((res) => {
        // console.log(res,'error')
        setShowAlert(true);
        setAlertConfig({
          type: res.response.data.code === 404 ? "warning" : "info",
          text: res.response.data.message,
        });
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);

        // console.log("verifyerror", res.response.data.message);
      });
  };
  const handleChangePassword = () => {
    ResetPasswordApi(
      formData.username,
      formData.password,
      formData.confirmPassword
    )
      .then((res) => {
        setShowAlert(true);
        setAlertConfig({
          type: "info",
          text: res.data.message,
        });

        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
        Navigation();
      })
      .catch((error) => {
        console.log(error,'error');
        setShowAlert(true);
        setAlertConfig({
          type: "warning",
          text: error.response.data.message,
        });
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
        // console.log("error", error.response.data.message);
      });
  };
  const handleSendOTP = () => {
    ForgotPasswordApi(formData.username)
      .then((res) => {
        setShowAlert(true);
        setAlertConfig({
          type: "info",
          text: res.data.message,
        });

        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertConfig({
          type: error.response.data.code === 404 ? "warning" : "info",
          text: error.response.data.message,
        });
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);

        // console.log("error", error.response.data.message);
      });
  };
  // console.log("passs", formData.password, "confo", formData.confirmPassword);

  return (
    <div className="forgot_form-1">
      {showAlert && (
        <DescriptionAlerts text={alertConfig.text} type={alertConfig.type} />
        )}
      {allStepsCompleted() ? (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            {activeStep === 0 && (
              <SendOtp formData={formData} setFormData={setFormData} />
              )}

            {activeStep === 1 && (
              <VerifyOtp formData={formData} setFormData={setFormData} />
              )}
            {activeStep === 2 && (
              <ChangePassword formData={formData} setFormData={setFormData} />
              )}
          </Typography>
              
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />

            <>
              {completedSteps() === totalSteps() - 3 ? (
                <div className="procced-btn">

                <Button
                  onClick={handleSendOTP}
                  className="forgot_form_button"
                  style={{ marginLeft: "20px", marginRight: "20px"}}
                  disabled={!formData.username}
                  // size="sm"
                >
                  Proceed
                </Button>
                </div>
              ) : completedSteps() === totalSteps() - 2 ? (
                <div className="next-btn">
                  <Button
                  onClick={handleVerifyOTP}
                  className="forgot_form_button"
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                  // size="sm"
                  disabled={!formData.otp}
                >
                  Next
                </Button>
                </div>
                
              ) : (
                <div className="reset-btn">
                  <Button
                  onClick={handleChangePassword}
                  className="forgot_form_button"
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                  // size="sm"
                  disabled={!formData.password || !formData.confirmPassword}
                >
                 Reset Password
                </Button>

                </div>
                
              )}
            </>
          </Box>
          {/* <div className="forgot_form_bottom">
            <h5>Already have an Account.</h5>
            <h5>
              <Link to="/login/" className="link">
                Sign In
              </Link>
            </h5>
          </div> */}
        </React.Fragment>
      )}
    </div>
  );
}

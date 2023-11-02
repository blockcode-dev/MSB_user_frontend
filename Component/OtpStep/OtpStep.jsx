import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { SendOTPAPI, VerifyOtpAPI } from "@/Constants/Api/Api";
import { useRouter } from "next/router";
const steps = [
  "Select campaign settings",
  "Create an ad group"
];
export default function OtpStep() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const router = useRouter();
  const navigate = router.replace;
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
        ?
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleVerifyOTP = () => {
    VerifyOtpAPI(formData.email, formData.otp)
      .then((res) => {
      })
    navigate("/signup")
      .catch((error) => {
        console.log(error, 'error')
      });
  };
  const handleSendOTP = () => {
    SendOTPAPI(formData.email)
      .then((res) => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      })
      .catch((error) => {
        console.log(error, "error")
      });
  };
  return (<>
    <div className="forgot_form-1">
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
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <>
              {completedSteps() === totalSteps() - 2 ? (
                <div className="procced-btn">
                  <Button
                    onClick={handleSendOTP}
                    className="forgot_form_button"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                    disabled={!formData.email}
                  // size="sm"
                  >
                    Proceed
                  </Button>
                </div>
              ) : completedSteps() === totalSteps() - 1 ? (
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
        </React.Fragment>
      )}
    </div>
    </>
  );
}

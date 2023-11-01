import React from "react";
import { Form } from "react-bootstrap";
import styles from "./Forgot.module.scss";
const SendOtp = ({ formData, setFormData }) => {
  return (<>
    <div className={styles.forgot_form}>
      <div className={styles.forgot_form_container}>
        <Form>
          <Form.Group className={styles.input_field}>
            <Form.Label style={{float:"left"}} >Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  </>
  );
};
export default SendOtp;

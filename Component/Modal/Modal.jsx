import { CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustomModal = (props) => {
    // console.log("props",props.price.id)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = ()=>{
    props.createSubscription(name,email,props.price.id);
    // props.onHide()
  }
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
        <h5>Total Amount: {props?.price?.unit_amount/100}</h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter Your Name"
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              placeholder="Enter Your Email"
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
        <div className="form-group mb-3">
          <label className="mb-3">Enter Your Card Details:</label>
          <CardElement className="cardelement" />
          {/* {errors.card && <span className="error">{errors.card}</span>} */}
        </div>
        </>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>submit</Button> */}
        <button onClick={handleSubmit} disabled={!props.stripe}>
        {props.loading ? "Loading" : "Subscribe"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;

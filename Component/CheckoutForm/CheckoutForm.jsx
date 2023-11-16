import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.scss";
import { useEffect } from "react";
import DescriptionAlerts from "@/Constants/alert/alert";
import Sub from "../sub";
import CustomModal from "../Modal/Modal";
import { Button } from "react-bootstrap";
const stripePromise = loadStripe(
  "pk_test_51MdIF9SJPxqRN9bb510qJMORkThvx0ZipxzG5nyu4d5WmEE2KHnAt1SC4HEwtTw05G2pAFLts5kvGPyXZ6fWTKSZ00Wt2Als23"
);
function CheckoutForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);
  const [priceTypes, setPriceTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [alert, setAlert] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
  });
  const handleModalOpen = (item) => {
    console.log("id", item);
    setPrice(item);
    setModalShow(true);
  };
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!selectedPrice) newErrors.price_id = "Please Select a price type!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const card = elements?.getElement(CardElement);
  console.log("card", card);
  console.log("elements", elements);
  console.log("CardElement", CardElement);
  const createSubscription = async (name, email, priceId) => {
    setLoading(true);
    try {
      if (!stripe || !elements) {
        // Stripe or Elements not yet available
        setLoading(false);
        return;
      }
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        });
      if (stripeError) {
        // Handle Stripe error
        setAlert(true);
        setAlertConfig({
          text: stripeError.message || "Card Details are Invalid",
          icon: "error",
        });
        setLoading(false);
        return;
      }
      const response = await fetch(
        "https://node.mystorybank.info:4000/api/v1/payment/stripe/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "YOUR_ACCESS_TOKEN_HERE",
          },
          body: JSON.stringify({
            paymentMethod: paymentMethod.id,
            name,
            email,
            priceId: priceId,
          }),
        }
      );
      console.log("response".response)
      const responseData = await response.json();
      const { clientSecret } = responseData;
      const confirmPayment = await stripe.confirmCardPayment(clientSecret);
      if (confirmPayment.error) {
        // Handle payment confirmation error
        setAlert(true);
        setAlertConfig({
          text: confirmPayment.error.message,
          icon: "error",
        });
      } else {
        // Payment successful
        setAlert(true);
        setAlertConfig({
          text: "",
          icon: "success",
        });
      }
      setLoading(false);
    } catch (error) {
      // Handle general errors
      setAlert(true);
      setAlertConfig({
        text: "An error occurred during payment processing",
        icon: "error",
      });
      setLoading(false);
      console.error("Error creating subscription:", error);
    }
  };
  // const createSubscription = async (name, email, priceId) => {
  //   console.log("checkig function", name, email);
  //   // if (validateForm()) {
  //   // }
  //   setLoading(true);
  //   try {
  //     if (!stripe || !elements) {
  //       // Stripe or Elements not yet available
  //       return;
  //     }
  //     const cardElement = elements.getElement(CardElement);
  //     const paymentMethod = await stripe.createPaymentMethod({
  //       type: "card",
  //       card: cardElement,
  //       billing_details: {
  //         name,
  //         email,
  //       },
  //     });
  //     console.log("paymentMethod", paymentMethod?.paymentMethod?.id);
  //     if (paymentMethod?.error) {
  //       setAlert(true);
  //       setAlertConfig({
  //         text: paymentMethod?.error?.message
  //           ? paymentMethod?.error?.message
  //           : "Card Details is Invalid",
  //         icon: "error",
  //       });
  //       setTimeout(() => {}, 1000);
  //       // Sweetalert.failed(
  //       //   paymentMethod?.error?.message
  //       //     ? paymentMethod?.error?.message
  //       //     : "Card Details is Invalid"
  //       // );
  //       setLoading(false);
  //       return;
  //     }
  //     const response = await fetch(
  //       "https://node.mystorybank.info:4000/api/v1/payment/stripe/create-subscription",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "x-access-token":
  //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5OTM1OTg0OCwiZXhwIjoxNjk5OTY0NjQ4LCJ0eXBlIjoiYWNjZXNzIn0.EXGkVZ2ENMu18KlfQuK-c2grVb4VWRWtiqqmJLclE50",
  //         },
  //         body: JSON.stringify({
  //           paymentMethod: paymentMethod?.paymentMethod?.id,
  //           name,
  //           email,
  //           priceId: priceId,
  //         }),
  //       }
  //     ).then((res) => {
  //       let response = res.json();
  //       console.log("response", response);
  //       return response;
  //     });
  //     console.log("stripe", stripe);
  //     const confirmPayment = await stripe?.confirmCardPayment(
  //       response.clientSecret
  //     );
  //     // console.log("confirmPayment",confirmPayment)
  //     if (confirmPayment?.error) {
  //       setAlert(true);
  //       setAlertConfig({
  //         text: confirmPayment.error.message,
  //         icon: "error",
  //       });
  //       setTimeout(() => {}, 1000);
  //       // Sweetalert.failed(confirmPayment.error.message);
  //     } else {
  //       setAlert(true);
  //       setAlertConfig({
  //         text: "",
  //         icon: "success",
  //       });
  //       setTimeout(() => {}, 1000);
  //       // Sweetalert.success();
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     // Sweetalert.failed();
  //     setAlert(true);
  //     setAlertConfig({
  //       icon: "error",
  //     });
  //     setTimeout(() => {}, 1000);
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const response = await fetch(
          "https://node.mystorybank.info:4000/api/v1/payment/stripe/price/list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": "YOUR_ACCESS_TOKEN_HERE",
            },
          }
        );
        const types = await response.json();
        setPriceTypes(types.data);
      } catch (error) {
        Sweetalert.failed();
      }
    };
    fetchPaymentTypes();
  }, []);
  // console.log(priceTypes, "priceTypes");
  return (
    <>
      {alert ? (
        <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
      ) : null}
      {/* <Sub priceTypes={priceTypes} loading={loading} createSubscription={createSubscription} stripe={stripe}/> */}
      <div>
        <div className={styles.pricing}>
          {priceTypes.map((item, index) => (
            <div className={styles.plan} key={index}>
              {item.unit_amount / 100} per {item.recurring.interval_count}{" "}
              {item.recurring.interval}
              <ul className={styles.features}>
                <li>
                  <i class="fas fa-check-circle"></i> Unlimited Websites
                </li>
                <li>
                  <i class="fas fa-check-circle"></i> 1 User
                </li>
                <li>
                  <i class="fas fa-check-circle"></i> 100MB Space/website
                </li>
                <li>
                  <i class="fas fa-check-circle"></i> Continuous deployment
                </li>
                <li>
                  <i class="fas fa-times-circle"></i> No priority support
                </li>
              </ul>
              <button onClick={() => handleModalOpen(item)}>Choose Plan</button>
            </div>
          ))}
          <CustomModal
            price={price}
            loading={loading}
            createSubscription={createSubscription}
            stripe={stripe}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
    </>
  );
}
const StripePayment = () => {
  // const options = {
  //     // passing the client secret obtained from the server
  //     clientSecret: '{{sk_test_51McO5hSFbrXB1QnNKQtEpBqgfUaO1bo35DCmocYo3J7tBMyiLTeyyh8xcQTaxUkF4V8GiJl5nscIwMsE15RXXbOY00AKc0MRrS}}',
  //   };
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
export default StripePayment;

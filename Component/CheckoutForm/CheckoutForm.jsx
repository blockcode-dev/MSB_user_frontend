import React, { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from  "./CheckoutForm.module.scss"
import { useEffect } from "react";
import DescriptionAlerts from "@/Constants/alert/alert";

const stripePromise = loadStripe(
  'pk_test_51MdIF9SJPxqRN9bb510qJMORkThvx0ZipxzG5nyu4d5WmEE2KHnAt1SC4HEwtTw05G2pAFLts5kvGPyXZ6fWTKSZ00Wt2Als23'
);

function CheckoutForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [priceTypes, setPriceTypes] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
      text: "",
  });
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState()
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

  const createSubscription = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const paymentMethod = await stripe?.createPaymentMethod({
          type: "card",
          card: card,
          billing_details: {
            name,
            email,
          },
        });

        if (paymentMethod?.error) {
          setAlert(true);
          setAlertConfig({
              text: paymentMethod?.error?.message
                  ? paymentMethod?.error?.message
                  : "Card Details is Invalid",
              icon: "error",
          });
          setTimeout(() => {
          }, 1000);
          // Sweetalert.failed(
          //   paymentMethod?.error?.message
          //     ? paymentMethod?.error?.message
          //     : "Card Details is Invalid"
          // );

          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://node.mystorybank.info:4000/api/v1/payment/stripe/create-subscription",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5OTM1OTg0OCwiZXhwIjoxNjk5OTY0NjQ4LCJ0eXBlIjoiYWNjZXNzIn0.EXGkVZ2ENMu18KlfQuK-c2grVb4VWRWtiqqmJLclE50",
            },
            body: JSON.stringify({
              paymentMethod: paymentMethod?.paymentMethod?.id,
              name,
              email,
              priceId: selectedPrice,
            }),
          }
        ).then((res) => {
          let response = res.json();
          return response;
        });

        const confirmPayment = await stripe?.confirmCardPayment(
          response.clientSecret
        );

        if (confirmPayment?.error) {
          setAlert(true);
          setAlertConfig({
              text:confirmPayment.error.message,
              icon: "error",
          });
          setTimeout(() => {
          }, 1000);
          // Sweetalert.failed(confirmPayment.error.message);
        } else {
          setAlert(true);
          setAlertConfig({
              text:"",
              icon: "success",
          });
          setTimeout(() => {
          }, 1000);
          // Sweetalert.success();
          setLoading(false);
        }
      } catch (error) {
        // Sweetalert.failed();
        setAlert(true);
        setAlertConfig({
           
            icon: "error"
        });
        setTimeout(() => {
        }, 1000);
        console.log(error);
      }
    }
  };

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
console.log(priceTypes,"priceTypes")
  return (<>
    {alert ? (
            <DescriptionAlerts text={alertConfig.text} icon={alertConfig.icon} />
        ) : null}
    priceTypes && (
      <div className={styles.payment}>
        <div className="form-group">
          <label>Subscription Type:</label>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            name="price_id"
          >
            <option value="">Select a Price</option>
            {priceTypes.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.unit_amount / 100} per {item.recurring.interval_count}{" "}
                {item.recurring.interval}
              </option>
            ))}
          </select>
          {/* {errors?.price_id && <span className="error">{errors?.price_id}</span>} */}
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            placeholder="Enter Your Name"
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {/* {errors?.name && <span className="error">{errors?.name}</span>} */}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            placeholder="Enter Your Email"
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* {errors.email && <span className="error">{errors.email}</span>} */}
        </div>

        <div className="form-group">
          <label>Enter Your Card Details:</label>
          <CardElement className="cardelement" />
          {/* {errors.card && <span className="error">{errors.card}</span>} */}
        </div>

        <button onClick={createSubscription} disabled={!stripe}>
          {loading ? "Loading" : "Subscribe"}
        </button>
      </div>
    )
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

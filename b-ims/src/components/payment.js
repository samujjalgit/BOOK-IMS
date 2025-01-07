import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/payment.css";

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    alert("Payment successful!");
    navigate("/confirmation");
  };

  return (
    <div className="payment-container">
      <h2>Checkout</h2>
      <div className="steps">
        <span>1 Shipping address</span>
        <span className="active">2 Payment details</span>
      </div>
      <div className="order-summary">
        <h3>Order summary</h3>
        <p>Three Men in a Boat</p>
        <p>Quantity: 1</p>
        <p>Total: ₹99.00</p>
      </div>
      <div className="payment-method">
        <h3>Payment method</h3>
        <input type="text" placeholder="Card number" />
        <input type="text" placeholder="MM / YY" />
        <input type="text" placeholder="CVC" />
      </div>
      <div className="buttons">
        <button type="button" className="back-btn" onClick={() => navigate("/checkout")}>
          Back
        </button>
        <button type="button" className="pay-btn" onClick={handlePayment}>
          Pay ₹99.00
        </button>
      </div>
    </div>
  );
};

export default Payment;

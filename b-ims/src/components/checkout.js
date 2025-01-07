import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/checkout.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    country: "India",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    navigate("/payment");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="steps">
        <span className="active">1 Shipping address</span>
        <span>2 Payment details</span>
      </div>
      <form className="checkout-form">
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            placeholder="First name *"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name *"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="text"
          name="address"
          placeholder="Address *"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <div className="form-group">
          <input
            type="text"
            name="city"
            placeholder="City *"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>
        <div className="buttons">
          <button type="button" className="back-btn" onClick={() => navigate("/cart")}>
            Back to Cart
          </button>
          <button type="button" className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

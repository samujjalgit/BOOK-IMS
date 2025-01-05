import React, { useEffect, useState } from "react";
import { onSnapshot, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./style/cart.css";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const cartRef = collection(db, "cart");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs
        .filter((doc) => doc.data().userEmail === user.email)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      console.log("Fetched cart items:", items); // Debugging
      setCartItems(items);
      setLoading(false); // Stop loading spinner
    });

    return () => unsubscribe();
  }, [user]);

  const GoToDashboard = () => navigate("/dash");

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cartItems]);

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      await deleteDoc(doc(db, "cart", id));
    } else {
      const cartItemRef = doc(db, "cart", id);
      await updateDoc(cartItemRef, { quantity });
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "cart", id));
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE20") {
      setDiscount(subtotal * 0.2);
    } else {
      setDiscount(0);
    }
  };

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  if (!user) {
    return <p>Please log in to view your cart.</p>;
  }

  if (cartItems.length === 0) {
    return <p>Your cart is empty. Add items from the dashboard to see them here.</p>;
  }

  const total = subtotal - discount + subtotal * 0.04;

  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>
      <div className="cart">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            {/* <img src={item.image || "default-image.jpg"} alt={item.title} className="item-image" /> */}
            <div className="item-details">
              <h3><strong>{item.title}</strong></h3>
              <p>{item.description}</p>
              <p>₹ {item.price.toFixed(2)}</p>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
            <button className="delete-item" onClick={() => deleteItem(item.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
      <div className="checkout">
        <div className="promo-section">
          <input
            type="text"
            placeholder="Promocode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={applyPromoCode}>Apply</button>
        </div>
        <div className="order-summary">
          <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
          <p>Discount: ₹  {discount.toFixed(2)}</p>
          <p>Tax: ₹ {(subtotal * 0.04).toFixed(2)}</p>
          <h4>Total: ₹ {total.toFixed(2)}</h4>
        </div>
        <button className="checkout-button">Proceed to checkout</button>
        <button className="continue-shopping-button" onClick={GoToDashboard}>Continue shopping</button>
      </div>
    </div>
  );
};

export default Cart;

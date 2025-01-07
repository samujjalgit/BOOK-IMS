import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AddEditBook from "./components/AddEditBook";
import Profile from "./components/Profile";
import About from "./components/about";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import Payment from "./components/payment";
// import Modal from './components/modals/Modal';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-edit-book" element={<AddEditBook />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dash" element={<Dashboard />}/>
      <Route path="/landing" element={<Landing />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/cart"  element={<Cart/>}/>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      {/* <Route path="/modals/modal" element={<Modal/>}/> */}
    </Routes>
  </Router>
  )
}
export default App;

import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import AddEditBook from "./components/AddEditBook";
import Transactions from "./components/Transactions";
import Reports from "./components/Reports";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Help from "./components/Help";
import Modal from './components/modals/Modal';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/add-edit-book" element={<AddEditBook />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/dash" element={<Dashboard />}/>
      <Route path="/landing" element={<Landing />}/>
      {/* <Route path="/modals/modal" element={<Modal/>}/> */}
    </Routes>
  </Router>
  )
}
export default App;

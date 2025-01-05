// Updated Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
  where,
  addDoc,
} from "firebase/firestore";
import AddEditBookModal from "./AddEditBook";
import { db } from "./firebase";
import "./style/Dashboard.css";
import "./style/landing.css";
import { getAuth } from "firebase/auth";
import { fetchBookSummary } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [selectedBookSummary, setSelectedBookSummary] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);

        const booksQuery = query(
          collection(db, "books"),
          where("userEmail", "==", user.email)
        );
        const unsubscribeBooks = onSnapshot(booksQuery, (snapshot) => {
          const fetchedBooks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBooks(fetchedBooks);
        });

        const cartQuery = query(
          collection(db, "cart"),
          where("userEmail", "==", user.email)
        );
        const unsubscribeCart = onSnapshot(cartQuery, (snapshot) => {
          const fetchedCartItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCartItems(fetchedCartItems);
        });

        return () => {
          unsubscribeBooks();
          unsubscribeCart();
        };
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleShowAddEditModal = () => setShowAddEditModal(true);
  const handleCloseAddEditModal = () => {
    setShowAddEditModal(false);
    setBookToEdit(null);
  };

  const goToProfile = () => navigate("/profile");
  const goToAbout = () => navigate("/about");
  const goToCart = () => navigate("/cart");
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const toggleRemoveMode = () => {
    setIsRemoving((prevState) => !prevState);
    setSelectedBooks([]);
  };

  const toggleUpdateMode = () => {
    setIsUpdating((prevState) => !prevState);
    setSelectedBooks([]);
  };

  const handleSelectBook = (bookId) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const handleRemoveBooks = async () => {
    if (selectedBooks.length === 0) {
      alert("No books selected for removal.");
      return;
    }

    try {
      const promises = selectedBooks.map((bookId) => deleteDoc(doc(db, "books", bookId)));
      await Promise.all(promises);
      setSelectedBooks([]);
      setIsRemoving(false);
      alert("Selected books removed successfully!");
    } catch (err) {
      console.error("Error removing books: ", err);
      alert("Failed to remove books. Please try again.");
    }
  };

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setShowAddEditModal(true);
  };

  const handleUpdateBook = async (updatedBook) => {
    try {
      const bookDoc = doc(db, "books", updatedBook.id);
      await updateDoc(bookDoc, updatedBook);
      alert("Book details updated successfully!");
    } catch (err) {
      console.error("Error updating book: ", err);
      alert("Failed to update book details. Please try again.");
    }
  };

  const handleBookClick = async (book) => {
    try {
      const summary = await fetchBookSummary(book.title);
      setSelectedBookSummary(summary);
    } catch (error) {
      console.error("Error fetching book summary:", error);
    }
  };

  const handleAddToCart = async (book) => {
    try {
      await addDoc(collection(db, "cart"), {
        bookId: book.id,
        title: book.title,
        price: book.price,
        stock: book.stock,
        quantity: 1,
        userEmail: userEmail,
      });
      alert(`${book.title} added to cart!`);
    } catch (error) {
      console.error("Error adding book to cart:", error);
      alert("Failed to add book to cart. Please try again.");
    }
  };

  const handleUpdateQuantity = async (cartItem, increment) => {
    try {
      const updatedQuantity = cartItem.quantity + increment;
      if (updatedQuantity < 1) return;

      const cartItemDoc = doc(db, "cart", cartItem.id);
      await updateDoc(cartItemDoc, { quantity: updatedQuantity });
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  if (!userEmail) {
    return (
      <div className="error-message">
        <p>User not logged in. Please log in to view your books.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Collection</h1>
        <nav className="dashboard-nav">
          <div className="dropdown-container">
            <button className="dropdown" onClick={toggleDropdown}>
              Products
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li onClick={handleShowAddEditModal}>
                  <i className="fa-solid fa-plus"></i> Add Product
                </li>
                <li onClick={toggleRemoveMode}>
                  <i className="fa-solid fa-trash"></i> {isRemoving ? "Cancel" : "Remove Product"}
                </li>
                <li onClick={toggleUpdateMode}>
                  <i className="fa-solid fa-edit"></i> {isUpdating ? "Cancel" : "Update Product"}
                </li>
              </ul>
            )}
          </div>
          <button className="dropdown" onClick={goToAbout}>
            About Us
          </button>
          <button className="dropdown" onClick={goToProfile}>Profile</button>

          <button className="cart" onClick={goToCart}>🛒</button>
        </nav>
      </header>

      <main className="dashboard-main">
        <div className="books-container">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                className={`book-card ${
                  (isRemoving || isUpdating) && selectedBooks.includes(book.id)
                    ? "selected"
                    : ""
                }`}
                key={book.id}
                onClick={() =>
                  isRemoving || isUpdating ? handleSelectBook(book.id) : handleBookClick(book)
                }
              >
                <div className="title-head">
                  <h1>
                    <strong>{book.title}</strong>
                  </h1>
                </div>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Price:</strong> Rs {book.price.toFixed(2)}</p>
                <p>
                  <strong>Added on:</strong>{" "}
                  {new Date(book.createdAt.seconds * 1000).toLocaleDateString()}
                </p>
                {isUpdating && (
                  <button
                    className="btn-edit"
                    onClick={() => handleEditBook(book)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn-add-to-cart"
                  onClick={() => handleAddToCart(book)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p><b>No books available. Add some to get started!</b></p>
          )}
        </div>

        {/* <div className="cart-container">
          <h2>Your Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <p><strong>{item.title}</strong></p>
                <p>Price: ₹ {item.price.toFixed(2)}</p>
                <div className="quantity-control">
                  <button onClick={() => handleUpdateQuantity(item, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item, 1)}>+</button>
                </div>
                <p>Total: ₹ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div> */}

        {isRemoving && (
          <div className="remove-actions">
            <button className="btn-remove" onClick={handleRemoveBooks}>
              Remove Selected Books
            </button>
          </div>
        )}

        {selectedBookSummary && (
          <div className="book-summary-panel">
            <h2>Book Summary</h2>
            <p>{selectedBookSummary}</p>
          </div>
        )}
      </main>

      {showAddEditModal && (
        <AddEditBookModal
          show={showAddEditModal}
          handleClose={handleCloseAddEditModal}
          bookToEdit={bookToEdit}
          handleSave={handleUpdateBook}
        />
      )}
    </div>
  );
}

export default Dashboard;

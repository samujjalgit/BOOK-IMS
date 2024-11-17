import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, doc, deleteDoc, updateDoc } from "firebase/firestore"; // Firestore imports
import AddEditBookModal from "./AddEditBook";
import { db } from "./firebase";
import "./style/Dashboard.css";
import "./style/landing.css";

function Dashboard() {
  const navigate = useNavigate();

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]); // State to store selected books
  const [isRemoving, setIsRemoving] = useState(false); // State for remove mode
  const [isUpdating, setIsUpdating] = useState(false); // State for update mode
  const [bookToEdit, setBookToEdit] = useState(null); // Book being edited

  // Fetch books from Firestore
  useEffect(() => {
    const q = query(collection(db, "books"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(fetchedBooks);
    });

    return () => unsubscribe();
  }, []);

  const handleShowAddEditModal = () => setShowAddEditModal(true);
  const handleCloseAddEditModal = () => {
    setShowAddEditModal(false);
    setBookToEdit(null); // Clear the book to edit when the modal is closed
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToAbout = () => {
    navigate("/about");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const toggleRemoveMode = () => {
    setIsRemoving((prevState) => !prevState);
    setSelectedBooks([]); // Clear selections when toggling
  };

  const toggleUpdateMode = () => {
    setIsUpdating((prevState) => !prevState);
    setSelectedBooks([]); // Clear selections when toggling
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
      const promises = selectedBooks.map((bookId) =>
        deleteDoc(doc(db, "books", bookId))
      );
      await Promise.all(promises);
      setSelectedBooks([]); // Clear selections after deletion
      setIsRemoving(false); // Exit remove mode
      alert("Selected books removed successfully!");
    } catch (err) {
      console.error("Error removing books: ", err);
      alert("Failed to remove books. Please try again.");
    }
  };

  const handleEditBook = (book) => {
    setBookToEdit(book); // Pass the selected book to the modal
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

  return (
    <div className="dashboard-container">
      {/* Header Section */}
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
          <button onClick={goToProfile}>Profile</button>
        </nav>
      </header>

      {/* Main Content */}
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
                  isRemoving || isUpdating ? handleSelectBook(book.id) : null
                }
              >
                <div className="title-head">
                  <h1>
                    <strong>{book.title}</strong>
                  </h1>
                </div>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p>
                  <strong>Description:</strong> {book.description}
                </p>
                <p>
                  <strong>Price:</strong> Rs {book.price.toFixed(2)}
                </p>
                <p>
                  <strong>Stock:</strong> {book.stock}
                </p>
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
              </div>
            ))
          ) : (
            <p>No books available. Add some to get started!</p>
          )}
        </div>
        {isRemoving && (
          <div className="remove-actions">
            <button className="btn-remove" onClick={handleRemoveBooks}>
              Remove Selected Books
            </button>
          </div>
        )}
      </main>

      {/* Add/Edit Book Modal */}
      {showAddEditModal && (
        <AddEditBookModal
          show={showAddEditModal}
          handleClose={handleCloseAddEditModal}
          bookToEdit={bookToEdit}
          handleSave={handleUpdateBook} // Handle update logic
        />
      )}
    </div>
  );
}

export default Dashboard;

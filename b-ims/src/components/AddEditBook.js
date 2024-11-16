import { React, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { db } from "./firebase"; // Ensure this is the correct Firestore import
import "./style/addbook.css";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"; // Firestore methods

function AddEditBookModal({ show, handleClose, bookToEdit }) {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookPrice, setBookPrice] = useState(0);
  const [bookStock, setBookStock] = useState(0);
  const [bookDesc, setBookDesc] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // To show success message

  // Pre-fill form data when editing a book
  useEffect(() => {
    if (bookToEdit) {
      setBookTitle(bookToEdit.title || "");
      setBookAuthor(bookToEdit.author || "");
      setBookGenre(bookToEdit.genre || "");
      setBookPrice(bookToEdit.price || 0);
      setBookStock(bookToEdit.stock || 0);
      setBookDesc(bookToEdit.description || "");
    } else {
      // Clear form when adding a new book
      setBookTitle("");
      setBookAuthor("");
      setBookGenre("");
      setBookPrice(0);
      setBookStock(0);
      setBookDesc("");
    }
  }, [bookToEdit]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!bookTitle || !bookAuthor || !bookGenre || bookPrice <= 0 || bookStock <= 0 || !bookDesc) {
      setError("All fields are required, and values must be valid.");
      return;
    }
    setError("");

    try {
      if (bookToEdit) {
        // Update existing book
        const bookRef = doc(db, "books", bookToEdit.id);
        await updateDoc(bookRef, {
          title: bookTitle,
          author: bookAuthor,
          genre: bookGenre,
          price: parseFloat(bookPrice),
          stock: parseInt(bookStock),
          description: bookDesc,
        });
      } else {
        // Add new book
        await addDoc(collection(db, "books"), {
          title: bookTitle,
          author: bookAuthor,
          genre: bookGenre,
          price: parseFloat(bookPrice),
          stock: parseInt(bookStock),
          description: bookDesc,
          createdAt: new Date(),
        });
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 2000);
    } catch (err) {
      console.error("Error saving product to Firestore: ", err);
      setError("Failed to save the product. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{bookToEdit ? "Edit Book" : "Add Book"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-box">
          <form autoComplete="off" className="form-group" onSubmit={handleSave}>
            <label htmlFor="book-title">Book Title</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setBookTitle(e.target.value)}
              value={bookTitle}
              required
            />
            <label htmlFor="book-author">Author</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setBookAuthor(e.target.value)}
              value={bookAuthor}
              required
            />
            <label htmlFor="book-genre">Genre</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setBookGenre(e.target.value)}
              value={bookGenre}
              required
            />
            <label htmlFor="book-price">Price</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setBookPrice(e.target.value)}
              value={bookPrice}
              required
            />
            <label htmlFor="book-stock">Stock</label>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setBookStock(e.target.value)}
              value={bookStock}
              required
            />
            <label htmlFor="book-desc">Description</label>
            <textarea
              className="form-control"
              onChange={(e) => setBookDesc(e.target.value)}
              value={bookDesc}
              required
            ></textarea>
            <button type="submit" className="btn-add">
              {bookToEdit ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Product saved successfully!</div>}
    </Modal>
  );
}

export default AddEditBookModal;

const express = require('express');

const {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook
} = require('../controllers/book.controller');
const { validate } = require('../middlewares/validate.middleware');
const {
  bookIdValidator,
  createBookValidator,
  getBooksValidator,
  updateBookValidator
} = require('../validators/book.validator');

const router = express.Router();

router
  .route('/books')
  .get(getBooksValidator, validate, getBooks)
  .post(createBookValidator, validate, createBook);

router
  .route('/books/:id')
  .get(bookIdValidator, validate, getBookById)
  .put(updateBookValidator, validate, updateBook)
  .delete(bookIdValidator, validate, deleteBook);

module.exports = router;

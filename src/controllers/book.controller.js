const { MESSAGES } = require('../constants/messages');
const { bookService } = require('../services/book.service');
const { asyncHandler } = require('../utils/async-handler');

const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBook(req.body);

  res.status(201).json({
    status: 'success',
    message: MESSAGES.BOOK_CREATED,
    data: book
  });
});

const getBooks = asyncHandler(async (req, res) => {
  const result = await bookService.getBooks(req.query);

  res.status(200).json({
    status: 'success',
    message: MESSAGES.BOOKS_FETCHED,
    ...result
  });
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await bookService.getBookById(req.params.id);

  res.status(200).json({
    status: 'success',
    message: MESSAGES.BOOK_FETCHED,
    data: book
  });
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await bookService.updateBook(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    message: MESSAGES.BOOK_UPDATED,
    data: book
  });
});

const deleteBook = asyncHandler(async (req, res) => {
  await bookService.deleteBook(req.params.id);

  res.status(200).json({
    status: 'success',
    message: MESSAGES.BOOK_DELETED
  });
});

module.exports = {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook
};

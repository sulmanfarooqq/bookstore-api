const mongoose = require('mongoose');

const { Book } = require('../models/book.model');
const { ApiError } = require('../utils/api-error');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildQuery = ({ search }) => {
  if (!search) {
    return {};
  }

  const escapedSearch = escapeRegex(search);

  return {
    $or: [
      { title: { $regex: escapedSearch, $options: 'i' } },
      { author: { $regex: escapedSearch, $options: 'i' } },
      { isbn: { $regex: escapedSearch, $options: 'i' } }
    ]
  };
};

const createBook = async (payload) => {
  try {
    return await Book.create(payload);
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, 'ISBN must be unique');
    }

    throw error;
  }
};

const getBooks = async ({ page = 1, limit = 10, search, sortBy = 'createdAt', order = 'desc' }) => {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const skip = (parsedPage - 1) * parsedLimit;
  const sortOrder = order === 'asc' ? 1 : -1;
  const query = buildQuery({ search });

  const [books, total] = await Promise.all([
    Book.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parsedLimit),
    Book.countDocuments(query)
  ]);

  return {
    data: books,
    pagination: {
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit) || 1
    }
  };
};

const getBookById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid book id');
  }

  const book = await Book.findById(id);

  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  return book;
};

const updateBook = async (id, payload) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid book id');
  }

  try {
    const book = await Book.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
      runValidators: true
    });

    if (!book) {
      throw new ApiError(404, 'Book not found');
    }

    return book;
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, 'ISBN must be unique');
    }

    throw error;
  }
};

const deleteBook = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid book id');
  }

  const book = await Book.findByIdAndDelete(id);

  if (!book) {
    throw new ApiError(404, 'Book not found');
  }
};

const bookService = {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook
};

module.exports = { bookService };

const { body, param, query } = require('express-validator');

const createBookValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('isbn')
    .trim()
    .notEmpty()
    .withMessage('ISBN is required')
    .isLength({ min: 10, max: 17 })
    .withMessage('ISBN must be between 10 and 17 characters'),
  body('publishedDate')
    .notEmpty()
    .withMessage('Published date is required')
    .isISO8601()
    .withMessage('Published date must be a valid date')
];

const updateBookValidator = [
  param('id').isMongoId().withMessage('Invalid book id'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('author').optional().trim().notEmpty().withMessage('Author cannot be empty'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('isbn')
    .optional()
    .trim()
    .isLength({ min: 10, max: 17 })
    .withMessage('ISBN must be between 10 and 17 characters'),
  body('publishedDate')
    .optional()
    .isISO8601()
    .withMessage('Published date must be a valid date')
];

const bookIdValidator = [param('id').isMongoId().withMessage('Invalid book id')];

const getBooksValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be at least 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().trim(),
  query('sortBy')
    .optional()
    .isIn(['title', 'author', 'price', 'publishedDate', 'createdAt', 'updatedAt'])
    .withMessage('Invalid sortBy value'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc')
];

module.exports = {
  bookIdValidator,
  createBookValidator,
  getBooksValidator,
  updateBookValidator
};

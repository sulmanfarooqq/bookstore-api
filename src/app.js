const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const routes = require('./routes');
const { errorMiddleware, notFoundMiddleware } = require('./middlewares/error.middleware');
const { sanitizeRequest } = require('./middlewares/sanitize.middleware');

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.'
  }
});

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL] : '*'
  })
);
app.use(morgan(process.env.LOG_LEVEL || 'dev'));
app.use(compression());
app.use(hpp());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeRequest);
app.use('/api', apiLimiter);

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Bookstore API is running'
  });
});

app.use('/api/v1', routes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;

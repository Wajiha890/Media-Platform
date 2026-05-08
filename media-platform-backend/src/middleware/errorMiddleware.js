// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log error for debugging
  console.error('Error:', err);
  
  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = { message, statusCode: 404 };
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `${field} already exists`;
    error = { message, statusCode: 400 };
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }
  
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }
  
  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File too large';
    error = { message, statusCode: 400 };
  }
  
  if (err.code === 'LIMIT_FILE_COUNT') {
    const message = 'Too many files';
    error = { message, statusCode: 400 };
  }
  
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Unexpected file field';
    error = { message, statusCode: 400 };
  }
  
  // Default error
  const statusCode = error.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  const message = error.message || 'Server Error';
  
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    errors: error.errors || null
  });
};

// Not found middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Async handler wrapper to avoid try-catch blocks
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation error handler
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(error => ({
    field: error.path,
    message: error.message
  }));
  
  return new AppError(`Validation Error: ${errors.map(e => e.message).join(', ')}`, 400);
};

// Duplicate key error handler
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyPattern)[0];
  const value = err.keyValue[field];
  return new AppError(`${field} '${value}' already exists. Please use another value.`, 400);
};

// Cast error handler
const handleCastError = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

// JWT error handler
const handleJWTError = () => new AppError('Invalid token. Please log in again.', 401);
const handleJWTExpiredError = () => new AppError('Your token has expired. Please log in again.', 401);

// Multer error handler
const handleMulterError = (err) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return new AppError('File size is too large. Maximum size is 100MB.', 400);
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    return new AppError('Too many files uploaded.', 400);
  }
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return new AppError('Unexpected file field.', 400);
  }
  return new AppError(err.message, 400);
};

// Global error handler with specific error types
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Development error response
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err
    });
  } 
  // Production error response
  else {
    // Operational errors: send message to client
    if (err.isOperational) {
      res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message
      });
    } 
    // Programming or unknown errors: don't leak details
    else {
      console.error('ERROR 💥', err);
      res.status(500).json({
        success: false,
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }
};

// Handle specific errors in production
const handleErrorsInProduction = (err) => {
  let error = { ...err };
  error.message = err.message;
  
  if (err.name === 'CastError') error = handleCastError(err);
  if (err.code === 11000) error = handleDuplicateKeyError(err);
  if (err.name === 'ValidationError') error = handleValidationError(err);
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();
  if (err.name === 'MulterError') error = handleMulterError(err);
  
  return error;
};

// Express middleware wrapper for async functions
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Rate limit error handler
const rateLimitErrorHandler = (err, req, res, next) => {
  if (err.code === 'LIMIT_RATE_LIMIT') {
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later.'
    });
  } else {
    next(err);
  }
};

module.exports = {
  errorHandler,
  notFound,
  asyncHandler,
  AppError,
  globalErrorHandler,
  handleErrorsInProduction,
  catchAsync,
  rateLimitErrorHandler
};

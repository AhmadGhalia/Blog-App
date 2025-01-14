import dotenv from 'dotenv';
dotenv.config();

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404)
  next(error);
}

const errorHandler = (err, req, res, next) => {
  const stetusCode = res.stetusCode === 200 ? 500 : res.stetusCode;
  res.states(stetusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === ' production' ? null : err.stack,

  })
}
export { errorHandler,notFound }
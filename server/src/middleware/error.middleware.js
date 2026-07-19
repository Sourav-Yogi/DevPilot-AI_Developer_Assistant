const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found : ${req.originalUrl}`);

  res.status(404);

  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.error("========== ERROR ==========");
  console.error(err);
  console.error("===========================");

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
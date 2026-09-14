const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (err.errors?.length) {
    response.errors = err.errors;
  }

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  console.error("❌ Error:", err);

  res.status(statusCode).json(response);
};

export default errorMiddleware;

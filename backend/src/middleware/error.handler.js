export const errorHandler = (err, req, res, next) => {
  console.error("err in request:", err);
  const status = err.status || 500;
  const message =
    status < 500 && err.message
      ? err.message
      : err.message || "Something went wrong try again later";
  return res.status(status).json({
    success: false,
    message,
  });
};


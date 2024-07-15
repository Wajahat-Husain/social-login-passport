const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message || "An unknown error occurred" });
};

export default errorHandler;

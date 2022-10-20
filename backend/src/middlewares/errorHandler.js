import config from "config";

const errorHandler = (err, req, res, next) => {
  const { message, status = 500 } = err;
  console.error(err);

  return res.status(status).json({
    error: message,
    stack: config.application.env !== "production" ? err.stack : null,
  });
};

export default errorHandler;

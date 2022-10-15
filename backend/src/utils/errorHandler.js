import createError from "http-errors";
const errorHandler = (app) => {
  app.use((req, res, next) => {
    next(createError(404));
  });

  app.use((err, req, res, next) => {
    const { message, status = 500 } = err;
    console.error(err);

    return res.status(status).json({ error: message });
  });
};

export default errorHandler;

const throwError = (
  error = null,
  message = "Something went wrong",
  status = 500
) => {
  let err;
  if (error) {
    err = error;
  } else {
    err = new Error(message);
  }
  err.status = status;
  throw err;
};
export default throwError;

//Middleware para los errores.
module.exports = (req, res, next) => {
  const httpStatus = err.status || 500;

  return res.status(httpStatus).send({
    status: httpStatus,
    message: err.message || "Internal server error"
  });
}

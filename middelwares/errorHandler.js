const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const { message } = err;
  if (statusCode === 500) {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
    return;
  }
  res.status(statusCode).send({ message });

  next();
};
module.exports = errorHandler;

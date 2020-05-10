const getFormattedError = (err) => {
  return err
}

exports.getFormattedError = getFormattedError

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  const formattedError = getFormattedError(err)
  res.status(formattedError.statusCode).send(formattedError.data)
}

const getFormattedError = (err) => {
  const formattedError = {
    data: {
      error: true,
      errorMessage: {
        message: err.message,
        secondaryMessage: err.secondaryMessage
      }
    }
  }

  switch (err.message) {
    case 'BAD-REQUEST':
      formattedError.statusCode = 400
      break
    case 'RESOURCE-NOT-FOUND':
      formattedError.statusCode = 404
      break
    default:
      formattedError.statusCode = 500
      formattedError.data.errorMessage.message = 'INTERNAL-SERVER-ERROR'
      formattedError.data.errorMessage.secondaryMessage = 'Internal Server Error'
  }
  return formattedError
}

exports.getFormattedError = getFormattedError

exports.errorHandler = (err, req, res, next) => {
  // console.error(err.stack)
  const formattedError = getFormattedError(err)
  res.status(formattedError.statusCode).send(formattedError.data)
}

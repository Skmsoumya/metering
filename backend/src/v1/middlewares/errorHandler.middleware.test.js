const { getFormattedError } = require('./errorHandler.middleware')

test('should return a formatted data object for errors', () => {
  try {
    const error = new Error('BAD-REQUEST')
    error.secondaryMessage = 'Invalid request parameters provided'
    throw error
  } catch (error) {
    const formattedError = getFormattedError(error)
    expect(formattedError.data).not.toBeUndefined()
    expect(formattedError.data.error).toBe(true)
    expect(formattedError.data.errorMessage).not.toBeUndefined()
    expect(formattedError.data.errorMessage.message).toBe('BAD-REQUEST')
    expect(formattedError.data.errorMessage.secondaryMessage).toBe(error.secondaryMessage)
  }
})

test('Should have formattedError.data.secondaryMessage undefined if no secondaryMessage was set on error', () => {
  try {
    const error = new Error('BAD-REQUEST')
    throw error
  } catch (error) {
    const formattedError = getFormattedError(error)
    expect(formattedError.data.errorMessage.secondaryMessage).toBeUndefined()
  }
})

test('should return a formatted error obj with a statusCode property set to 404 for "RESOURCE-NOT-FOUND" error', () => {
  try {
    const error = new Error('RESOURCE-NOT-FOUND')
    throw error
  } catch (error) {
    const formattedError = getFormattedError(error)
    expect(formattedError.statusCode).toBe(404)
  }
})

test('should return a formatted Internal Server Error for random errors', () => {
  try {
    const error = new Error('A random error')
    throw error
  } catch (error) {
    const formattedError = getFormattedError(error)
    expect(formattedError.data).not.toBeUndefined()
    expect(formattedError.data.error).toBe(true)
    expect(formattedError.data.errorMessage.message).toBe('INTERNAL-SERVER-ERROR')
    expect(formattedError.data.errorMessage).not.toBeUndefined()
    expect(formattedError.data.errorMessage.secondaryMessage).toBe('Internal Server Error')
    expect(formattedError.statusCode).toBe(500)
  }
})

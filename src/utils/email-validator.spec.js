const validator = require('validator')

class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

describe('Email Validator', () => {
  test('Should return true if validator returns true', () => {
    const sut = new EmailValidator()
    const isEmailValid = sut.isValid('valid_email@email.com')
    expect(isEmailValid).toBe(true)
  })
})

describe('Email Validator', () => {
  test('Should return false if validator returns false', () => {
    const sut = new EmailValidator()
    validator.isEmailValid = false
    const isEmailValid = sut.isValid('invalid_email')
    expect(isEmailValid).toBe(false)
  })
})

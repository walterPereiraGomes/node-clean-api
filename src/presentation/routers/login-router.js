const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      if (typeof httpRequest.body !== 'object') {
        return HttpResponse.serverError()
      }

      const { email, password } = httpRequest.body
      if (!email) {
        return HttpResponse.badRequest('email')
      }
      if (!password) {
        return HttpResponse.badRequest('password')
      }

      const accessToken = this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorizedError()
      }

      return {
        ...HttpResponse.success(),
        body: {
          accessToken
        }
      }
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}

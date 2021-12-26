const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      if (typeof httpRequest.body !== 'object') {
        return HttpResponse.serverError()
      }

      const { email, password } = httpRequest.body

      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }

      // if (!/email/.test(email)) {

      // }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }

      const accessToken = await this.authUseCase.auth(email, password)
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

'use strict'

class OauthService {
  constructor (credentialsProvider, credentialsRepository) {
    this.credentialsProvider = credentialsProvider
    this.credentialsRepository = credentialsRepository
  }

  register (code) {
    return this.credentialsProvider.exchangeFor(code)
    .then((credentials) => {
      return this.credentialsRepository.save(credentials)
    })
    .catch()
  }
}

module.exports = OauthService

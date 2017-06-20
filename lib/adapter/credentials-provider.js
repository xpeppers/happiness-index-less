'use strict'
var request = require('request')

class CredentialsProvider {

  constructor(clientId, clientSecret) {
    this.clientId = clientId
    this.clientSecret = clientSecret
  }

  exchangeFor(code) {

    return new Promise((resolve, reject) => {
      request(urlFrom(this.clientId, this.clientSecret, code), function (error, response, body) {
        var data = JSON.parse(body)

        if(error) {
          reject(error)
        }
        else if(!data.ok) {
          reject(data.error)
        } else {
          resolve(data)
        }
      })

    })

  }

}

function urlFrom(clientId, clientSecret, code) {
  return 'https://slack.com/api/oauth.access' +
  `?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
}

module.exports = CredentialsProvider

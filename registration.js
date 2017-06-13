const OAuthService = require('./lib/oauth-service')
const CredentialsProvider = require('./lib/credentials-provider')
const CredentialsRepository = require('./lib/repository/credentials-repository')

module.exports.oauth = (event, context, callback) => {
  var clientId = process.env.CLIENT_ID
  var clientSecret = process.env.CLIENT_SECRET

  var service = new OAuthService(new CredentialsProvider(clientId, clientSecret), new CredentialsRepository())

  service.register(event.queryStringParameters.code)
    .then(() => {
      context.succeed({
        statusCode: 200
      })
    })
    .catch(() => {
      context.succeed({
        statusCode: 400
      })
    })
}

const OAuthService = require('./lib/oauth-service')

module.exports.oauth = (event, context, callback) => {
  var service = new OAuthService()
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

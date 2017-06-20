const CredentialsRepository   = require('./lib/repository/credentials-repository')
const SurveyService           = require('./lib/service/survey-service')
const SlackTeamInfoRepository = require('./lib/repository/slack-team-info-repository')
const LastSurveyRepository    = require('./lib/repository/last-survey-repository')
const SlackMessenger          = require('./lib/adapter/slack-messenger')

module.exports.send = (event, context, callback) => {
  var credentialsRepository = new CredentialsRepository()

  credentialsRepository.botTokenOf(event.queryStringParameters.team_name)
  .then((botToken) => {
    var service = new SurveyService(new SlackTeamInfoRepository(botToken), new SlackMessenger(botToken), new LastSurveyRepository())
    var channel = event.queryStringParameters.channel
    return channel ? service.sendOne(channel) : service.sendAll()
  })
  .then(() => {
    context.succeed({
      statusCode: 200
    })
  })
  .catch(() => {
    context.succeed({
      statusCode: 500
    })
  })
}

const SurveyService = require('./lib/survey-service')
const CredentialsRepository = require('./lib/repository/credentials-repository')
const SlackTeamInfoRepository = require('./lib/repository/slack-team-info-repository')
const SlackMessenger = require('./lib/slack-messenger')

module.exports.survey = (event, context, callback) => {
  var credentialsRepository = new CredentialsRepository()
  
  credentialsRepository.botTokenOf(event.queryStringParameters.team_name)
  .then((botToken) => {
    var service = new SurveyService(new SlackTeamInfoRepository(botToken), new SlackMessenger(botToken))
    return service.sendAll()
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

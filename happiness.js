const SurveyService = require('./lib/survey-service')
const Answer = require('./lib/answer')
const AnswerRepository = require('./lib/repository/answer-repository')
const RecordAnswerService = require('./lib/record-answer-service')
const CredentialsRepository = require('./lib/repository/credentials-repository')
const SlackTeamInfoRepository = require('./lib/repository/slack-team-info-repository')
const SlackMessenger = require('./lib/slack-messenger')

module.exports.survey = (event, context, callback) => {
  var credentialsRepository = new CredentialsRepository()

  credentialsRepository.botTokenOf(event.queryStringParameters.team_name)
  .then((botToken) => {
    var service = new SurveyService(new SlackTeamInfoRepository(botToken), new SlackMessenger(botToken))
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

module.exports.answer = (event, context, callback) => {
  var recordAnswerService = new RecordAnswerService(new AnswerRepository())
  var payload = JSON.parse(decodeURIComponent(event.body).split('payload=').join(''))

  recordAnswerService.record(Answer.fromPayload(payload))
  .then((reply) => {
    context.succeed({
      statusCode: 200,
      body: JSON.stringify(reply.forSlackChannel())
    })
  })
  .catch(() => {
    context.succeed({
      statusCode: 500
    })
  })


}

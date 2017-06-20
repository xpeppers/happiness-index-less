const SurveyService           = require('./lib/service/survey-service')
const RecordAnswerService     = require('./lib/service/record-answer-service')

const AnswerRepository        = require('./lib/repository/answer-repository')
const CredentialsRepository   = require('./lib/repository/credentials-repository')
const SlackTeamInfoRepository = require('./lib/repository/slack-team-info-repository')
const LastSurveyRepository    = require('./lib/repository/last-survey-repository')

const SlackMessenger          = require('./lib/adapter/slack-messenger')

const Answer                  = require('./lib/entity/answer')

module.exports.survey = (event, context, callback) => {
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

module.exports.answer = (event, context, callback) => {
  var recordAnswerService = new RecordAnswerService(new AnswerRepository())
  var payload = JSON.parse(decodeURIComponent(event.body).split('payload=').join(''))

  recordAnswerService.record(Answer.fromPayload(payload))
  .then((thankYou) => {
    context.succeed({
      statusCode: 200,
      body: JSON.stringify(thankYou.forSlackChannel())
    })
  })
  .catch(() => {
    context.succeed({
      statusCode: 500
    })
  })


}

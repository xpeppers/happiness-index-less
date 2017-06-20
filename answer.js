const RecordAnswerService     = require('./lib/service/record-answer-service')
const AnswerRepository        = require('./lib/repository/answer-repository')
const Answer                  = require('./lib/entity/answer')

module.exports.record = (event, context, callback) => {
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

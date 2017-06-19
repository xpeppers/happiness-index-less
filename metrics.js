const MetricsServiceFactory = require('./lib/metrics-service-factory')
const qs = require('qs')

module.exports.show = (event, context, callback) => {
  var parsedBody = qs.parse(event.body)
  var type = parsedBody.text;
  var teamId = parsedBody.team_id;
  var service = MetricsServiceFactory.serviceFor(type)

  service.metricsOf(teamId)
  .then((metrics) => {
    context.succeed({
      statusCode: 200,
      body: JSON.stringify(metrics.forSlackChannel())
    })
  })
  .catch(() => {
    context.succeed({
      statusCode: 500
    })
  })

}

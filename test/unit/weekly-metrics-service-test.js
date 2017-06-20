const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const expect = require('chai').use(chaiAsPromised).use(sinonChai).expect
const sinon = require('sinon')

const Answer = require('../../lib/answer')
const WeeklyMetrics = require('../../lib/weekly-metrics')
const WeeklyMetricsService = require('../../lib/weekly-metrics-service')

describe('WeeklyMetricsService', () => {

  var weeklyMetricsService
  var answerRepository
  var lastSurveyRepository

  beforeEach(() => {
    answerRepository = sinon.stub()
    lastSurveyRepository = sinon.stub()
    weeklyMetricsService = new WeeklyMetricsService(answerRepository, lastSurveyRepository)
  })

  describe('#metricsOf', () => {

    it('returns answers since last survey grouped by happiness value', () => {
      var answers = [
        new Answer('any team', 'any channel', Answer.AWESOME),
        new Answer('any team', 'any channel', Answer.AWESOME),
        new Answer('any team', 'any channel', Answer.REALLY_BAD),
      ]
      var expectedMetrics = WeeklyMetrics.builder()
        .total(3)
        .reallyBad(1)
        .awesome(2)
        .build()

      answerRepository.findSince = sinon.stub().returns(Promise.resolve(answers))
      lastSurveyRepository.date = sinon.stub().returns(Promise.resolve('any date'))

      return weeklyMetricsService.metricsOf('a team')
      .then((metrics) => {
        expect(metrics).to.be.eql(expectedMetrics)
      })
    })

    it('returns no metrics when there is no last survey for team', () => {
      lastSurveyRepository.date = sinon.stub().returns(Promise.resolve(null))

      return weeklyMetricsService.metricsOf('a team')
      .then((metrics) => {
        expect(metrics).to.be.eql(WeeklyMetrics.none())
      })
    })

  })

})

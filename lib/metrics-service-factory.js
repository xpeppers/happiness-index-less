'use strict'

const WeeklyMetricsService = require('./weekly-metrics-service')
const AnswerRepository = require('./repository/answer-repository')
const LastSurveyRepository = require('./repository/last-survey-repository')

class MetricsServiceFactory {

  static serviceFor(metricsType) {
    return new WeeklyMetricsService(new AnswerRepository(), new LastSurveyRepository())
  }

}

module.exports = MetricsServiceFactory

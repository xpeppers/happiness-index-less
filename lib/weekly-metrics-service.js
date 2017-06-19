'use strict'
const WeeklyMetrics = require('./weekly-metrics')

class WeeklyMetricsService {

  constructor(answerRepository, lastSurveyRepository) {
    this.answerRepository = answerRepository
    this.lastSurveyRepository = lastSurveyRepository
  }

  metricsOf(teamId) {
    return this.lastSurveyRepository.date(teamId)
      .then((lastSurveyDate) => {
        return this.answerRepository.findSince(lastSurveyDate, teamId)
      })
      .then((answers) => {
        return Promise.resolve(WeeklyMetrics.fromAnswers(answers))
      })
  }

}

module.exports = WeeklyMetricsService

'use strict'
const WeeklyMetrics = require('./weekly-metrics')
const NO_SURVEY_ERROR = 'no survey'

class WeeklyMetricsService {

  constructor(answerRepository, lastSurveyRepository) {
    this.answerRepository = answerRepository
    this.lastSurveyRepository = lastSurveyRepository
  }

  metricsOf(teamId) {
    return this.lastSurveyRepository.date(teamId)
      .then((lastSurveyDate) => {
        if(!lastSurveyDate) throw NO_SURVEY_ERROR
        return this.answerRepository.findSince(lastSurveyDate, teamId)
      })
      .then((answers) => {
        return Promise.resolve(WeeklyMetrics.fromAnswers(answers))
      })
      .catch((error) => {
        if(error === NO_SURVEY_ERROR) {
          return Promise.resolve(WeeklyMetrics.none())
        } else {
          return Promise.reject(error)
        }
      })
  }

}

module.exports = WeeklyMetricsService

'use strict'

class Configuration {

  static get CREDENTIALS_TABLE_NAME_TEST() {
   return 'happiness-index-credentials-staging';
  }

  static get CREDENTIALS_TABLE_NAME_PRODUCTION() {
   return 'happiness-index-credentials';
  }

  static get ANSWER_TABLE_NAME_TEST() {
   return 'happiness-index-answers-staging';
  }

  static get ANSWER_TABLE_NAME_PRODUCTION() {
   return 'happiness-index-answers';
  }

  static get LAST_SURVEY_TABLE_NAME_TEST() {
   return 'happiness-index-last-survey-staging';
  }

  static get LAST_SURVEY_TABLE_NAME_PRODUCTION() {
   return 'happiness-index-last-survey';
  }

  static lastSurveyTableName() {
    return isProduction() ? Configuration.LAST_SURVEY_TABLE_NAME_PRODUCTION : Configuration.LAST_SURVEY_TABLE_NAME_TEST
  }

  static credentialsTableName() {
    return isProduction() ? Configuration.CREDENTIALS_TABLE_NAME_PRODUCTION : Configuration.CREDENTIALS_TABLE_NAME_TEST
  }

  static answerTableName() {
    return isProduction() ? Configuration.ANSWER_TABLE_NAME_PRODUCTION : Configuration.ANSWER_TABLE_NAME_TEST
  }

}

function isProduction() {
  return process.env.STAGE === 'production'
}

module.exports = Configuration

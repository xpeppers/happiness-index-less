'use strict'

class Configuration {

  static get CREDENTIALS_TABLE_NAME_TEST() {
   return 'happiness-index-credentials-staging';
 }

 static get CREDENTIALS_TABLE_NAME_PRODUCTION() {
   return 'happiness-index-credentials';
 }

  static get ANSWER_TABLE_NAME_TEST() {
   return 'happiness-index-survey-staging';
 }

 static get ANSWER_TABLE_NAME_PRODUCTION() {
   return 'happiness-index-survey';
 }

  static credentialsTableName() {
    if (process.env.STAGE === 'production') {
      return Configuration.CREDENTIALS_TABLE_NAME_PRODUCTION
    } else {
      return Configuration.CREDENTIALS_TABLE_NAME_TEST
    }
  }

  static answerTableName() {
    if (process.env.STAGE === 'production') {
      return Configuration.ANSWER_TABLE_NAME_PRODUCTION
    } else {
      return Configuration.ANSWER_TABLE_NAME_TEST
    }
  }

}

module.exports = Configuration

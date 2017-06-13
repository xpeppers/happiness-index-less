'use strict'

class Configuration {

  static get CREDENTIALS_TABLE_NAME_TEST() {
   return 'happiness-index-credentials-test';
 }

 static get CREDENTIALS_TABLE_NAME_PRODUCTION() {
   return 'happiness-index-credentials';
 }

  static credentialsTableName() {
    if (process.env.STAGE === 'production') {
      return Configuration.CREDENTIALS_TABLE_NAME_PRODUCTION
    } else {
      return Configuration.CREDENTIALS_TABLE_NAME_TEST
    }
  }

}

module.exports = Configuration

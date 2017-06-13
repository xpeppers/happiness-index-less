'use strict'
const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-1"})

class CredentialsRepository {

  constructor() {
    this.tableName = (typeof process.env.TABLE_NAME !== 'undefined') ?  process.env.TABLE_NAME : 'happiness-index-credentials-test';
    this.awsClient = new AWS.DynamoDB.DocumentClient();
  }

  save(teamCredentials) {
    var params = {
      TableName: this.tableName,
      Item: teamCredentials
    };

    return new Promise((resolve, reject) => {
      this.awsClient.put(params, (error, data) => {
        if(error){
          console.error(error)
          reject({message: 'Salvataggio fallito'});
        } else {
          resolve({message: 'Credenziali salvate con successo'});
        }
      })

    });
  }

  getCredentialsOf(teamName) {
    var params = {
      TableName: this.tableName,
      Key: { "team_name": teamName }
    };

    return new Promise((resolve, reject) => {
      this.awsClient.get(params, function(error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data.Item);
        }
      })
    });

  }

}

module.exports = CredentialsRepository
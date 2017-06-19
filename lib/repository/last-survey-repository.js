'use strict'
const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-1"})
const Configuration = require('../configuration')

class LastSurveyRepository {

  constructor() {
    this.tableName = Configuration.lastSurveyTableName();
    this.awsClient = new AWS.DynamoDB.DocumentClient();
  }

  save(date, teamId) {
    var params = {
      TableName: this.tableName,
      Item: {
        'team_id' : teamId,
        'timestamp' : date.toISOString()
      }
    };

    return new Promise((resolve, reject) => {
      this.awsClient.put(params, (error, data) => {
        if(error){
          console.error(error)
          reject({message: 'Salvataggio fallito'});
        } else {
          resolve({message: 'Data salvata con successo'});
        }
      })

    });
  }

  date(teamId) {
    var params = {
      TableName: this.tableName,
      Key: { 'team_id': teamId }
    };

    return new Promise((resolve, reject) => {
      this.awsClient.get(params, function(error, data) {
        if (error) {
          console.error(error)
          reject(error);
        } else {
          resolve(new Date(data.Item.timestamp));
        }
      })
    });

  }

}

module.exports = LastSurveyRepository

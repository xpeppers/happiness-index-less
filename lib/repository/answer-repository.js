'use strict'
const AWS = require("aws-sdk");
const uuid = require('uuid/v4')
AWS.config.update({region: "eu-west-1"})

const Configuration = require('../configuration')
const Answer = require('../answer')

class AnswerRepository {

  constructor() {
    this.tableName = Configuration.answerTableName();
    this.awsClient = new AWS.DynamoDB.DocumentClient();
  }

  save(answer, id) {
    var params = {
      TableName: this.tableName,
      Item: {
        id : id ? id : uuid(),
        vote : answer.getVote(),
        team : answer.getTeam(),
        channel : answer.getChannel(),
        timestamp : answer.getTimestamp().toISOString()
      }
    };

    return new Promise((resolve, reject) => {
      this.awsClient.put(params, (error, data) => {
        if(error){
          console.error(error)
          reject({message: 'Salvataggio fallito'});
        } else {
          resolve({message: 'Risposta salvata con successo'});
        }
      })

    });
  }

  get(answerId) {
    var params = {
      TableName: this.tableName,
      Key: { "id": answerId }
    };

    return new Promise((resolve, reject) => {
      this.awsClient.get(params, function(error, data) {
        if (error) {
          console.error(error)
          reject(error);
        } else {
          resolve(Answer.fromDynamoItem(data.Item));
        }
      })
    });
  }

}

module.exports = AnswerRepository

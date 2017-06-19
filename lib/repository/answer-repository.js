'use strict'
const AWS = require("aws-sdk");
const uuid = require('uuid/v4')
AWS.config.update({region: "eu-west-1"})

const Configuration = require('../configuration')
const Answer = require('../answer')

class AnswerRepository {

  constructor() {
    this.tableName = Configuration.answerTableName();
    this.awsClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  }

  save(answer, id) {
    var params = {
      TableName: this.tableName,
      Item: {
        id : {S : id ? id : uuid() },
        vote : { N : answer.getVote().toString() },
        team : { S : answer.getTeam() },
        channel : { S : answer.getChannel() },
        timestamp : { S : answer.getTimestamp().toISOString() }
      }
    };

    return new Promise((resolve, reject) => {
      this.awsClient.putItem(params, (error, data) => {
        if(error){
          console.error(error)
          reject({message: 'Salvataggio fallito'});
        } else {
          resolve({message: 'Risposta salvata con successo'});
        }
      })

    });
  }

  findSince(date, teamId) {
    return new Promise((resolve, reject) => {
      var params = {
        TableName: this.tableName,
        IndexName: "timestamp-index",
        FilterExpression: "#happinessDate > :lastSurveyDate",
        ExpressionAttributeNames: {
          "#happinessDate": "timestamp"
        },
        ExpressionAttributeValues: {
          ":lastSurveyDate": { S: date.toISOString() }
        }
       }

       this.awsClient.scan(params, function(error, data) {
         if (error) {
           console.error(error)
           reject(error)
         }
         else {
           var answers = data.Items.map(Answer.fromDynamoItem).filter((answer) => answer.belongsTo(teamId))
           resolve(answers)
         }
      })
   })
  }

  get(answerId) {
    var params = {
      TableName: this.tableName,
      Key: { "id": { S : answerId } }
    };

    return new Promise((resolve, reject) => {
      this.awsClient.getItem(params, function(error, data) {
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

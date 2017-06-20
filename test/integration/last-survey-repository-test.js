const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').use(chaiAsPromised).expect;
const sinon = require('sinon');

const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-1"})
var awsClient = new AWS.DynamoDB.DocumentClient();

const LastSurveyRepository = require('../../lib/repository/last-survey-repository');
const Configuration = require('../../lib/configuration')

describe('LastSurveyRepository', function () {

  const TEAM_ID = 'team_id'
  var lastSurveyRepository;

  this.timeout(30000);

  beforeEach(function() {
    lastSurveyRepository = new LastSurveyRepository();
    return cleanDb({team_id: TEAM_ID})
  })

  describe('#save', function () {
    it('saves a team last survey date into database', function () {
      var surveyDate = new Date()

      return lastSurveyRepository.save(surveyDate, TEAM_ID)
      .then(data => {
        expect(data).to.eql({message: 'Data salvata con successo'})
        return lastSurveyRepository.date(TEAM_ID)
      })
      .then(data => {
        expect(data).to.eql(surveyDate)
      })
    });

  })

  describe('#date', function() {

    it('returns null when no survey was sent yet for that team', function() {
      return lastSurveyRepository.date('a new team')
      .then((data) => expect(data).to.eql(null) )
    })

  })

})

function cleanDb(key) {
  var params = {
    TableName: Configuration.LAST_SURVEY_TABLE_NAME_TEST,
    Key: key
  };

  return new Promise((resolve, reject) => {
    awsClient.delete(params, function(err, data) {
      if(err) {
        console.log(err)
        reject("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        resolve()
      }
    })
  })

}

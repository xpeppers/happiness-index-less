const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').use(chaiAsPromised).expect;
const sinon = require('sinon');

const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-1"})
var awsClient = new AWS.DynamoDB.DocumentClient();

const AnswerRepository = require('../../lib/repository/answer-repository');
const Answer = require('../../lib/answer')
const Configuration = require('../../lib/configuration')

describe('AnswerRepository', function () {

  const TEST_ID = 'test'
  var answerRepository;

  this.timeout(30000);

  beforeEach(function() {
    answerRepository = new AnswerRepository();
    return cleanDb({id: TEST_ID})
  })

  describe('#save', function () {
    it('saves an answer into repository', function () {

      var answer = new Answer('any team', 'any channel', Answer.AWESOME, new Date())

      return answerRepository.save(answer, TEST_ID)
      .then(data => {
        expect(data).to.eql({message: 'Risposta salvata con successo'})
        return answerRepository.get(TEST_ID)
      })
      .then(data => {
        expect(data).to.eql(answer)
      })
    });

  })

})

function cleanDb(key) {
  var params = {
    TableName: Configuration.ANSWER_TABLE_NAME_TEST,
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

const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').use(chaiAsPromised).expect;
const sinon = require('sinon');

const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-1"})
var awsClient = new AWS.DynamoDB.DocumentClient();

const CredentialsRepository = require('../../lib/repository/credentials-repository');
const Configuration = require('../../lib/configuration')

describe('CredentialsRepository', function () {

  const MY_TEAM_CREDENTIALS = {
    "access_token": "any",
    "scope": "identify,bot,commands,incoming-webhook",
    "user_id": "any",
    "team_name": "my-team",
    "team_id": "any",
    "incoming_webhook": {
      "channel": "@any",
      "channel_id": "any",
      "configuration_url": "any",
      "url": "any"
    },
    "bot": {
      "bot_user_id": "any",
      "bot_access_token": "any"
    }
  }


  var credentialsRepository;

  this.timeout(30000);

  beforeEach(function(done) {
    credentialsRepository = new CredentialsRepository();

    cleanDb({team_name: MY_TEAM_CREDENTIALS['team_name']})
      .then(done)
      .catch(err => { throw new Error(err); });
  })

  describe('#save', function () {
    it('saves a team credentials into database', function () {

      return credentialsRepository.save(MY_TEAM_CREDENTIALS)
      .then(data => {
        expect(data).to.eql({message: 'Credenziali salvate con successo'})
        return credentialsRepository.getCredentialsOf(MY_TEAM_CREDENTIALS['team_name'])
      })
      .then(data => {
        expect(data).to.eql(MY_TEAM_CREDENTIALS)
      })
    });

  })

  describe('#botTokenOf', function () {

    it('retrieves bot user token for team', function () {

      return credentialsRepository.save(MY_TEAM_CREDENTIALS)
      .then(data => {
        expect(data).to.eql({message: 'Credenziali salvate con successo'})
        return credentialsRepository.botTokenOf(MY_TEAM_CREDENTIALS['team_name'])
      })
      .then(data => {
        expect(data).to.eql(MY_TEAM_CREDENTIALS['bot']['bot_access_token'])
      })
    });

  })

})

function cleanDb(key) {
  var params = {
    TableName: Configuration.CREDENTIALS_TABLE_NAME_TEST,
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

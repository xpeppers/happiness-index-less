const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').use(chaiAsPromised).expect;
const sinon = require('sinon');


const CredentialsRepository = require('../../lib/repository/credentials-repository');

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

  beforeEach(function() {
    credentialsRepository = new CredentialsRepository();

    // cleanDb({email: ANY_USER.email})
    //   .then(done)
    //   .catch(err => { throw new Error(err); });
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

  });

  // describe('#notExists', function () {
  //   it('returns true when user does not exist', function () {
  //     return expect(credentialsRepository.notExists(ANY_USER.email))
  //             .to.eventually.eql(true);
  //   });
  //
  //   it('returns error when user exist', function () {
  //     userValidator.isValid = sinon.stub().returns(true);
  //
  //     return credentialsRepository.create(ANY_USER)
  //     .then(function() {
  //       return expect(credentialsRepository.notExists(ANY_USER.email))
  //         .to.be.rejectedWith({message: 'Utente già registrato'});
  //     });
  //   });
  // });

})

// function cleanDb(key) {
//   var params = {
//     TableName:"buddy_bank",
//     Key: key
//   };
//
//   return new Promise((resolve, reject) => {
//       awsClient.delete(params, function(err, data) {
//           if (err) {
//             reject("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
//           }
//           else {
//             resolve();
//           }
//       });
//   })
// }

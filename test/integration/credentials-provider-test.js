const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').use(chaiAsPromised).expect;
const sinon = require('sinon');
const CredentialsProvider = require('../../lib/credentials-provider');

describe('CredentialsProvider', function() {

  var credentialsProvider;

  this.timeout(30000);

  describe('#exchangeFor', function() {

    it('returns error when invalid client id and secret', function() {
      credentialsProvider = new CredentialsProvider('any', 'any');

      return credentialsProvider.exchangeFor('wrong')
      .catch(error => {
        expect(error).to.eql('invalid_client_id')
      })
    })

  })

})

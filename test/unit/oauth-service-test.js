const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const expect = require('chai').use(chaiAsPromised).use(sinonChai).expect
const sinon = require('sinon')

const OauthService = require('../../lib/service/oauth-service')

describe('OauthService', () => {
  var oauthService
  var credentialsProvider
  var credentialsRepository

  beforeEach(() => {
    credentialsProvider = sinon.stub()
    credentialsRepository = sinon.stub()
    oauthService = new OauthService(credentialsProvider, credentialsRepository)
  })

  it('saves credentials when is able to exchange them for code', () => {
    credentialsProvider.exchangeFor = sinon.stub().returns(Promise.resolve('some credentials'))
    credentialsRepository.save = sinon.spy()

    return oauthService.register('sample code')
    .then(() => {
      return expect(credentialsRepository.save).to.have.been.calledOnce
    })
  })
})

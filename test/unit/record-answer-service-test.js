const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const expect = require('chai').use(chaiAsPromised).use(sinonChai).expect
const sinon = require('sinon')

const RecordAnswerService = require('../../lib/record-answer-service')
const Answer = require('../../lib/answer')

describe('RecordAnswerService', () => {

  var recordAnswerService
  var answerRepository

  beforeEach(() => {
    answerRepository = sinon.stub()
    recordAnswerService = new RecordAnswerService(answerRepository)
  })

  describe('#record', () => {

    it('saves answer and replies accordingly', () => {
      answerRepository.save = sinon.stub().returns(Promise.resolve())

      return recordAnswerService.record(new Answer('any team', 'any channel', Answer.AWESOME))
      .then((reply) => {
        expect(reply.text()).to.be.eql('Thank you for your feedback! You said that your week was awesome.')
      })
    })

  })

})

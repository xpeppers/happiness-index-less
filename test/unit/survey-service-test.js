const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const expect = require('chai').use(chaiAsPromised).use(sinonChai).expect
const sinon = require('sinon')

const SurveyService = require('../../lib/service/survey-service')
const TeamMember = require('../../lib/entity/team-member')
const HappinessSurveyMessage = require('../../lib/message/happiness-survey-message')

describe('SurveyService', () => {

  var surveyService
  var teamInfoRepository
  var lastSurveyRepository
  var messenger
  const A_MEMBER = new TeamMember({})
  const ANOTHER_MEMBER = new TeamMember({})

  beforeEach(() => {
    teamInfoRepository = sinon.stub()
    messenger = sinon.stub()
    lastSurveyRepository = sinon.stub()
    teamInfoRepository.teamId = sinon.stub().returns(Promise.resolve('any id'))
    surveyService = new SurveyService(teamInfoRepository, messenger, lastSurveyRepository)
  })

  describe('#sendAll', function() {
    it('sends survey to all team members and updates last survey date', () => {
      teamInfoRepository.allTeamMembers = sinon.stub().returns(Promise.resolve([A_MEMBER, ANOTHER_MEMBER]))
      messenger.sendMessage = sinon.stub().returns(Promise.resolve())
      lastSurveyRepository.save = sinon.spy()

      return surveyService.sendAll()
      .then(() => {
        expect(lastSurveyRepository.save).to.have.been.called
        return expect(messenger.sendMessage).to.have.been.calledWith(new HappinessSurveyMessage(), [A_MEMBER, ANOTHER_MEMBER])
      })
    })
  })

  describe('#sendOne', function() {

    it('sends survey to a team member and updates last survey date', () => {
      teamInfoRepository.teamMember = sinon.stub().returns(Promise.resolve(A_MEMBER))
      messenger.sendMessage = sinon.stub().returns(Promise.resolve())
      lastSurveyRepository.save = sinon.spy()

      return surveyService.sendOne("anyChannelId")
      .then(() => {
        expect(lastSurveyRepository.save).to.have.been.called
        return expect(messenger.sendMessage).to.have.been.calledWith(new HappinessSurveyMessage(), [A_MEMBER])
      })
    })
  })

})

const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const expect = require('chai').use(chaiAsPromised).use(sinonChai).expect
const sinon = require('sinon')

const SurveyService = require('../../lib/survey-service')
const TeamMember = require('../../lib/team-member')
const HappinessSurveyMessage = require('../../lib/happiness-survey-message')

describe('OauthService', () => {

  var surveyService
  var teamInfoRepository
  var messenger

  beforeEach(() => {
    teamInfoRepository = sinon.stub()
    messenger = sinon.stub()
    surveyService = new SurveyService(teamInfoRepository, messenger)
  })

  describe('#sendAll', function() {
    it('sends survey to all team members', () => {
      teamInfoRepository.allTeamMembers = sinon.stub().returns(Promise.resolve([new TeamMember('a channel id')]))
      messenger.sendMessage = sinon.spy()

      return surveyService.sendAll()
      .then(() => {
        return expect(messenger.sendMessage).to.have.been.calledWith(new HappinessSurveyMessage(), [new TeamMember('a channel id')])
      })
    })
  })

})

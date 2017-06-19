const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').use(chaiAsPromised).expect;
const sinon = require('sinon');

const SlackTeamInfoRepository = require('../../lib/repository/slack-team-info-repository');
const TeamMember = require('../../lib/team-member');

describe('SlackTeamInfoRepository', function () {

  const BOT_TOKEN_OF_TEST_TEAM = 'xoxb-197668950503-0F5C2jD23JdShgKnkEMsOXRm'
  const SLACKBOT_USER_ID = 'USLACKBOT'
  const SLACKBOT_USER = new TeamMember({ id: 'D5TKNTZLP' })
  var slackTeamInfoRepository;

  this.timeout(30000);

  beforeEach(function() {
    slackTeamInfoRepository = new SlackTeamInfoRepository(BOT_TOKEN_OF_TEST_TEAM);
  })

  describe('#allTeamMembers', function () {

    it('retrieves list of all team members that have private chat with happybot', function () {

      return slackTeamInfoRepository.allTeamMembers()
      .then(data => {
        var slackBot = data.find((teamMember) => teamMember.userId() == SLACKBOT_USER_ID)
        expect(slackBot).not.to.be.an('undefined');
      })

    });

  })

  describe('#teamMember', function() {

    it('retrieves a team member given their chat id', function () {

      return slackTeamInfoRepository.teamMember(SLACKBOT_USER.channel())
      .then(member => {
        expect(member.channel()).to.be.eql(SLACKBOT_USER.channel())
      })
    })
  })

  describe('#teamId', function() {

    it('retrieves the current team\'s id', function() {
      return slackTeamInfoRepository.teamId()
      .then(id => {
        expect(id).to.be.eql('T3ZGB1DFC')
      })
    })

  })

})

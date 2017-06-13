const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').use(chaiAsPromised).expect;
const sinon = require('sinon');

const SlackMessenger = require('../../lib/slack-messenger');
const SlackTeamInfoRepository = require('../../lib/repository/slack-team-info-repository');
const TeamMember = require('../../lib/team-member');
const TextMessage = require('../../lib/text-message');

describe('SlackMessenger', function () {

  const BOT_TOKEN_OF_TEST_TEAM = 'xoxb-197668950503-0F5C2jD23JdShgKnkEMsOXRm'
  const SLACKBOT_USER = new TeamMember({ id: 'D5TKNTZLP' })
  var slackMessenger;
  var teamInfoRepository = new SlackTeamInfoRepository(BOT_TOKEN_OF_TEST_TEAM);

  this.timeout(30000);

  beforeEach(function() {
    slackMessenger = new SlackMessenger(BOT_TOKEN_OF_TEST_TEAM);
  })

  describe('#sendMessage', function () {

    it('sends message to all users specified', function () {

      var messageContent = randomString()

      return slackMessenger.sendMessage(new TextMessage(messageContent), [SLACKBOT_USER])
      .then(() => {
        return teamInfoRepository.historyOf(SLACKBOT_USER)
      })
      .then(messageHistory => {
        expect(messageHistory[0]['text']).to.eql(messageContent)
      })

    });

  })

})

function randomString() {
  return Math.random().toString(36).substring(7)
}

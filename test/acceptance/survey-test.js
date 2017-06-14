const endpoint = process.env.ENDPOINT ? process.env.ENDPOINT : 'http://localhost:3000'
const supertest = require('supertest-as-promised')
const expect = require('chai').expect;
const SlackTeamInfoRepository = require('../../lib/repository/slack-team-info-repository');
const TeamMember = require('../../lib/team-member');

const client = supertest(endpoint)

describe('send survey', function () {
  this.timeout(30000)

  const BOT_TOKEN_OF_TEST_TEAM = 'xoxb-197668950503-0F5C2jD23JdShgKnkEMsOXRm'
  const SLACKBOT_USER = new TeamMember({ id: 'D5TKNTZLP' })
  const TEST_TEAM_NAME = 'BotLand'

  var teamInfoRepository = new SlackTeamInfoRepository(BOT_TOKEN_OF_TEST_TEAM);

  it('sends survey to a team', function () {
    return client.get(`/survey?team_name=${TEST_TEAM_NAME}&channel=${SLACKBOT_USER.channel()}`)
      .expect(200)
      .then(() => {
        return teamInfoRepository.historyOf(SLACKBOT_USER)
      })
      .then(messageHistory => {
        expect(messageHistory[1]['text']).to.eql('Hello dear. How was your week?')
      })
  })
})

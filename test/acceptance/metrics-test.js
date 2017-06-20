const endpoint = process.env.ENDPOINT ? process.env.ENDPOINT : 'http://localhost:3000'
const supertest = require('supertest-as-promised')
const expect = require('chai').expect;
const TeamMember = require('../../lib/entity/team-member');

const client = supertest(endpoint)

const BUTTON_CLICKED_PAYLOAD = "payload=%7B%22actions%22%3A%5B%7B%22name%22%3A%22Good%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%223%22%7D%5D%2C%22callback_id%22%3A%22happiness%22%2C%22team%22%3A%7B%22id%22%3A%22T3ZGB1DFC%22%2C%22domain%22%3A%22bot-land%22%7D%2C%22channel%22%3A%7B%22id%22%3A%22D5STNB03X%22%2C%22name%22%3A%22directmessage%22%7D%2C%22user%22%3A%7B%22id%22%3A%22U407821MM%22%2C%22name%22%3A%22valentina.servile" +
  "%22%7D%2C%22action_ts%22%3A%221497446326.591151%22%2C%22message_ts%22%3A%221497434482.839710%22%2C%22attachment_id%22%3A%221%22%2C%22token%22%3A%225ifpaiXL7cb1p0c0ZObl8IEq%22%2C%22is_app_unfurl%22%3Afalse%2C%22original_message%22%3A%7B%22type%22%3A%22message%22%2C%22user%22%3A%22U5TKNTYET%22%2C%22text%22%3A%22Hello+dear.+How+was+your+week%3F%22%2C%22bot_id%22%3A%22B5SSA7F60%22%2C%22attachments%22%3A%5B%7B%22callback_id%22%3A%22happiness%22%2C%22fallback%22%3A%22Ooops.+Something+went+wrong+%3A%28%22%2C%22text%22%3A%22Choose+an+option+below%3A%22%2C%22id%22%3A1%2C%22actions" +
  "%22%3A%5B%7B%22id%22%3A%221%22%2C%22name%22%3A%22Awesome%22%2C%22text%22%3A%22Awesome%21%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%224%22%2C%22style%22%3A%22%22%7D%2C%7B%22id%22%3A%222%22%2C%22name%22%3A%22Good%22%2C%22text%22%3A%22Good%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%223%22%2C%22style%22%3A%22%22%7D%2C%7B%22id%22%3A%223%22%2C%22name%22%3A%22Bad%22%2C%22text" +
  "%22%3A%22Bad%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%222%22%2C%22style%22%3A%22%22%7D%2C%7B%22id%22%3A%224%22%2C%22name%22%3A%22Really+Bad%22%2C%22text%22%3A%22Really+Bad%22%2C%22type" +
  "%22%3A%22button%22%2C%22value%22%3A%221%22%2C%22style%22%3A%22%22%7D%5D%7D%5D%2C%22ts%22%3A%221497434482.839710%22%7D%2C%22response_url%22%3A%22https%3A%5C%2F%5C%2Fhooks.slack.com%5C%2Factions%5C%2FT3ZGB1DFC%5C%2F197636128322%5C%2F6dbGhrQ5m1Ftd6McVR2Ymp88%22%7D"

const SLASH_COMMAND_PAYLOAD = "token=5ifpaiXL7cb1p0c0ZObl8IEq&team_id=T3ZGB1DFC&team_domain=bot-land&channel_id=C3ZGB1L1G&channel_name=general&user_id=U407821MM&user_name=valentina.servile&command=%2Fmetrics&text=&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT3ZGB1DFC%2F199188839936%2Fau8irH0kkAlV4P9z7nQNPUtw"
const SLASH_COMMAND_PAYLOAD_TEAM_WITH_NO_SURVEY = "token=5ifpaiXL7cb1p0c0ZObl8IEq&team_id=1234&team_domain=bot-land&channel_id=C3ZGB1L1G&channel_name=general&user_id=U407821MM&user_name=valentina.servile&command=%2Fmetrics&text=&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT3ZGB1DFC%2F199188839936%2Fau8irH0kkAlV4P9z7nQNPUtw"

describe('metrics', function () {
  this.timeout(30000)

  const SLACKBOT_USER = new TeamMember({ id: 'D5TKNTZLP' })
  const TEST_TEAM_NAME = 'BotLand'


  it('prints metrics since last survey was sent', function() {
    var expectedResponse =  {
      "response_type":"ephemeral",
      "replace_original":false,
      "text": "1 people have voted in the last survey.\n" +
        "0 people said their week was really bad, \n" +
        "0 people said their week was bad, \n" +
        "1 people said their week was good, \n" +
        "0 people said their week was awesome."
    }

    return client.get(`/survey?team_name=${TEST_TEAM_NAME}&channel=${SLACKBOT_USER.channel()}`)
      .expect(200)
      .then(() => {
        return client.post('/button')
        .type('form')
         .send(BUTTON_CLICKED_PAYLOAD)
         .expect(200)
      })
      .then(() => {
        return client.post('/metrics')
        .type('form')
        .send(SLASH_COMMAND_PAYLOAD)
        .expect(200)
        .expect((response) => expect(response.body).to.eql(expectedResponse))
      })
  })

  it('prints a helpful message if no survey yet', function() {
      var helpfulMessage = {
          "response_type": "ephemeral",
          "replace_original": false,
          "text": 'There are no metrics yet for this team'
      }

      return client.post('/metrics')
      .type('form')
      .send(SLASH_COMMAND_PAYLOAD_TEAM_WITH_NO_SURVEY)
      .expect(200)
      .expect((response) => expect(response.body).to.eql(helpfulMessage))

  })

})

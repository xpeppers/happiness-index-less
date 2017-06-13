'use strict'

const WebClient = require('@slack/client').WebClient;
const TeamMember = require('../team-member');

class SlackTeamInfoRepository {

  constructor(token) {
    this.web = new WebClient(token)
  }

  allTeamMembers() {
    return new Promise((resolve, reject) => {
      this.web.im.list((error, info) => {
        if(error) {
          reject(error)
        } else {
          var teamMembers = info.ims.map((chatId) => new TeamMember(chatId))
          resolve(teamMembers)
        }
      })
    })
  }

  historyOf(member) {

    return new Promise((resolve, reject) => {
      this.web.im.history(member.channel(),  function(error, result) {
          if (error) {
            reject(error);
          }
          else if (!result.ok) {
            reject(result.error);
          }
          else {
            resolve(result.messages);
          }
      })
    })

  }

}

module.exports = SlackTeamInfoRepository

'use strict'

const WebClient = require('@slack/client').WebClient;
const TeamMember = require('../entity/team-member');

class SlackTeamInfoRepository {

  constructor(token) {
    this.web = new WebClient(token)
  }

  allTeamMembers() {
    return new Promise((resolve, reject) => {
      this.web.im.list((error, info) => {
        if(error) {
          console.error(error)
          reject(error)
        } else {
          var teamMembers = info.ims.map((chatId) => new TeamMember(chatId))
          resolve(teamMembers)
        }
      })
    })
  }

  teamMember(channelId) {
    return this.allTeamMembers()
    .then(teamMembers => {
      var teamMember = teamMembers.find(member => member.channel() == channelId)
      return Promise.resolve(teamMember)
    })
  }

  teamId() {
    return new Promise((resolve, reject) => {
      this.web.team.info((error, result) => {
        if(error) {
          console.error(error)
          reject(error)
        } else if (!result.ok) {
          console.error(result.error)
          reject(result.error)
        } else {
          resolve(result.team.id)
        }
      })
    })
  }

  historyOf(member) {
    return new Promise((resolve, reject) => {
      this.web.im.history(member.channel(),  function(error, result) {
          if (error) {
            console.error(error)
            reject(error)
          }
          else if (!result.ok) {
            console.error(result.error)
            reject(result.error)
          }
          else {
            resolve(result.messages)
          }
      })
    })

  }

}

module.exports = SlackTeamInfoRepository

'use strict'

const WebClient = require('@slack/client').WebClient;

class SlackMessenger {

  constructor(token) {
    this.web = new WebClient(token)
  }

  sendMessage(message, teamMembers) {
    var messages = this.prepareMessages(message, teamMembers.map(teamMember => teamMember.channel()))
    return Promise.all(messages)
  }

  prepareMessages(message, channels) {
    return channels.map(channel => this.messageFor(message, channel))
  }

  messageFor(message, channel) {
    return new Promise((resolve, reject) => {
      this.web.chat.makeAPICall('chat.postMessage', message.forSlackChannel(channel), (error, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(response)
        }
      })
    })
  }

}

module.exports = SlackMessenger

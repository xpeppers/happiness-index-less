'use strict'

class TeamMember {

  constructor(chatInfo) {
    this.chatInfo = chatInfo
  }

  userId() {
    return this.chatInfo['user']
  }

  channel() {
    return this.chatInfo['id']
  }

}

module.exports = TeamMember

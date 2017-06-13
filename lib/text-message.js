'use strict'

class TextMessage {

  constructor(message) {
    this.message = message
  }

  forSlackChannel(channelId) {
    return {
      channel: channelId,
      text: this.message,
      as_user : true,
      replace_original : false
    }
  }
}

module.exports = TextMessage

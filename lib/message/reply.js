'use strict'

class Reply {

  constructor(content) {
    this.content = content
  }

  text() {
    return this.content
  }

  forSlackChannel() {
    return {
      "response_type": "ephemeral",
      "replace_original": true,
      "text": this.content
    }
  }

}

module.exports = Reply

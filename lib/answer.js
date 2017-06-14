'use strict'

const ANSWER_STRINGS = ['really bad', 'bad', 'good', 'awesome']

class Answer {

  static get REALLY_BAD() {
   return 1;
 }

  static get BAD() {
   return 2;
  }

  static get GOOD() {
   return 3;
  }

  static get AWESOME() {
   return 4;
  }

  constructor(team, channel, voteValue, date) {
    this.team = team
    this.channel = channel
    this.voteValue = voteValue
    this.timestamp = date ? date : new Date();
  }

  static fromPayload(answerPayload) {
    var team = answerPayload.team.id
    var channel = answerPayload.channel.id
    var voteValue = answerPayload.actions[0].value
    return new Answer(team, channel, voteValue)
  }

  static fromDynamoItem(item) {
    return new Answer(item.team, item.channel, item.vote, new Date(item.timestamp))
  }

  getTeam() {
    return this.team
  }

  getVote() {
    return this.voteValue
  }

  getChannel() {
    return this.channel
  }

  getTimestamp() {
    return this.timestamp
  }

  toString() {
    return ANSWER_STRINGS[this.voteValue -1]
  }

}

module.exports = Answer

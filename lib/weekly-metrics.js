'use strict'
const Answer = require('./answer')

class WeeklyMetrics {

  constructor(total, awesome, good, bad, reallyBad) {
    this.total = total ? total : 0
    this.awesome = awesome ? awesome : 0
    this.good = good ? good : 0
    this.bad = bad ? bad : 0
    this.reallyBad = reallyBad ? reallyBad : 0
  }

  static builder() {
    return new WeeklyMetricsBuilder()
  }

  static none() {
    return new NoWeeklyMetrics()
  }

  static fromAnswers(answers) {
    return new WeeklyMetrics(
      answers.length,
      howMany(Answer.AWESOME, answers),
      howMany(Answer.GOOD, answers),
      howMany(Answer.BAD, answers),
      howMany(Answer.REALLY_BAD, answers)
    )
  }

  forSlackChannel() {
    var text = this.total + " people have voted in the last survey.\n" +
        this.reallyBad + " people said their week was really bad, \n" +
        this.bad + " people said their week was bad, \n" +
        this.good + " people said their week was good, \n" +
        this.awesome + " people said their week was awesome."

    return {
        "response_type": "ephemeral",
        "replace_original": false,
        "text": text
    }
  }

}

function howMany(value, answers) {
  var results = answers.filter((answer) =>  answer.getVote() == value )
  return results.length
}

class WeeklyMetricsBuilder {

  total(totalCount) {
    this.totalCount = totalCount
    return this
  }

  awesome(awesomeCount) {
    this.awesomeCount = awesomeCount
    return this
  }

  good(goodCount) {
    this.goodCount = goodCount
    return this
  }

  bad(badCount) {
    this.badCount = badCount
    return this
  }

  reallyBad(reallyBadCount) {
    this.reallyBadCount = reallyBadCount
    return this
  }

  build() {
    return new WeeklyMetrics(this.totalCount, this.awesomeCount, this.goodCount, this.badCount, this.reallyBadCount)
  }

}

class NoWeeklyMetrics {

  forSlackChannel() {
    return {
        "response_type": "ephemeral",
        "replace_original": false,
        "text": 'There are no metrics yet for this team'
    }
  }

}


module.exports = WeeklyMetrics

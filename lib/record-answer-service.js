'use strict'
const Reply = require('./reply')

class RecordAnswerService {

  constructor(answerRepository) {
    this.answerRepository = answerRepository
  }

  record(answer) {
    return this.answerRepository.save(answer)
    .then(() => {
      var reply = new Reply(`Thank you for your feedback! You said that your week was ${answer}.`)
      return Promise.resolve(reply)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
  }

}

module.exports = RecordAnswerService

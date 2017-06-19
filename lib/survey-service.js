'use strict'

const HappinessSurveyMessage = require('./happiness-survey-message')

class SurveyService {

  constructor(teamInfoRepository, messenger, lastSurveyRepository) {
    this.teamInfoRepository = teamInfoRepository
    this.messenger = messenger
    this.lastSurveyRepository = lastSurveyRepository
  }

  sendAll() {
    return this.teamInfoRepository.allTeamMembers()
      .then((teamMembers) => { return this.sendTo(teamMembers) })
  }

  sendOne(channelId) {
    return this.teamInfoRepository.teamMember(channelId)
      .then((teamMember) => {return this.sendTo([teamMember]) })
  }

  sendTo(members) {
    return this.messenger.sendMessage(new HappinessSurveyMessage(), members)
    .then(() => {
      return this.teamInfoRepository.teamId()
    })
    .then((teamId) => {
      return this.lastSurveyRepository.save(new Date(), teamId)
    })
  }

}

module.exports = SurveyService

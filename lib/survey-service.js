'use strict'

const HappinessSurveyMessage = require('./happiness-survey-message')

class SurveyService {

  constructor(teamInfoRepository, messenger) {
    this.teamInfoRepository = teamInfoRepository
    this.messenger = messenger
  }

  sendAll() {
    return this.teamInfoRepository.allTeamMembers()
      .then((teamMembers) => {
        return this.messenger.sendMessage(new HappinessSurveyMessage(), teamMembers)
      })
  }

  sendOne(channelId) {
    return this.teamInfoRepository.teamMember(channelId)
      .then((teamMember) => {
        return this.messenger.sendMessage(new HappinessSurveyMessage(), [teamMember])
      })
  }

}

module.exports = SurveyService

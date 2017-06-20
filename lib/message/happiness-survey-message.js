'use strict'

class HappinessSurveyMessage {

  forSlackChannel(channelId) {
    return {
      channel : channelId,
      text : 'Hello dear. How was your week?',
      as_user : true,
      replace_original: false,
      attachments : [
        {
          text : "Choose an option below:",
          callback_id : 'happiness',
          fallback : 'Ooops. Something went wrong :(',
          actions: [
            {
                "name": "Awesome",
                "text": "Awesome!",
                "type": "button",
                "value": "4"
            },
            {
                "name": "Good",
                "text": "Good",
                "type": "button",
                "value": "3"
            },
            {
                "name": "Bad",
                "text": "Bad",
                "type": "button",
                "value": "2"
            },
            {
                "name": "Really Bad",
                "text": "Really Bad",
                "type": "button",
                "value": "1"
            }
          ]
        }
      ]
    }
  }

}

module.exports = HappinessSurveyMessage

const endpoint = process.env.ENDPOINT ? process.env.ENDPOINT : 'http://localhost:3000'
const supertest = require('supertest-as-promised')

const client = supertest(endpoint)

describe('get auth', function () {
  this.timeout(30000)

  it('returns 400 Bad Request for invalid code', function () {
    return client.get('/auth?code=anyCode')
      .expect(400)
  })
})

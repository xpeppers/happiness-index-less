const endpoint  = process.env.ENDPOINT ? process.env.ENDPOINT : 'http://localhost:3000';
const supertest = require('supertest-as-promised');
const expect = require('chai').expect;

const client = supertest(endpoint);

describe('get auth', function() {

  this.timeout(30000)

  it('returns 200 ok', function() {

    return client.get('/auth?code=anyCode')
      .expect(200)
  });

})

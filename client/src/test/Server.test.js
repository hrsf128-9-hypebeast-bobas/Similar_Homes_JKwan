const request = require('supertest')
const host = 'https://localhost:3003'

describe('API request', () => {
  it('should get the test endpoint', () => {
    request(host).get(`/api/similarListings`)
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(10);
      done();
    })
  })
});
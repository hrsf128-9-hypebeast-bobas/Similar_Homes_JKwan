const request = require('supertest')
const host = 'https://localhost:3003'

xdescribe('API request', () => {
  it('should get the test endpoint', () => {
    return request(host).get(`/api/similarListings`)
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(10);
      done();
    });
  })
});
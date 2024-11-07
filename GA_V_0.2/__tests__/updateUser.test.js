const request = require('supertest');
const app = require('../server');

describe('PUT /api/users/:uuid', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'johndoe@example.com',
        password: 'password123',
      });
    token = res.body.accessToken;
  });

  it('should update the user details', async () => {
    const res = await request(app)
      .put('/api/users/uuid-of-user')
      .set('x-access-token', token)
      .send({
        firstname: 'Johnny',
        email: 'johnny@example.com',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('firstname', 'Johnny');
  });

  it('should return 404 if user not found', async () => {
    const res = await request(app)
      .put('/api/users/non-existent-uuid')
      .set('x-access-token', token)
      .send({
        firstname: 'Johnny',
      });
    expect(res.statusCode).toEqual(404);
  });
});

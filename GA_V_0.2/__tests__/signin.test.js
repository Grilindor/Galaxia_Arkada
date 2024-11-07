const request = require('supertest');
const app = require('../server');

describe('POST /api/auth/signin', () => {
  it('should login a user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'johndoe@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should return 401 for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'johndoe@example.com',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid password!');
  });
});

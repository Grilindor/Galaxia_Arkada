const request = require('supertest');
const app = require('../server');

describe('DELETE /api/users/:uuid', () => {
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

  it('should delete the user', async () => {
    const res = await request(app)
      .delete('/api/users/uuid-of-user')
      .set('x-access-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User was deleted successfully!');
  });

  it('should return 404 if user not found', async () => {
    const res = await request(app)
      .delete('/api/users/non-existent-uuid')
      .set('x-access-token', token);
    expect(res.statusCode).toEqual(404);
  });
});

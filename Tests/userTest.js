// ================================
// user.test.js
// Purpose: Test basic API endpoint using Supertest + Jest
// ================================
import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('should return API message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('User Management System');
  });
});

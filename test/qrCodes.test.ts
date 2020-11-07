import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/sequelize';

describe('POST to qrcodes', () => {
  beforeEach(async () => { await sequelize.sync({ force: true }); })
  it('should return 200 OK', async () => {
    const response = await request(app).post('/qrcodes')
      .send({
        title: 'Twitter',
        url: 'https://twitter.com'
      })
      .expect(201);
    expect(response.body.title).toBe('Twitter');
  });

  it('should get all qrcodes', async () => {
    const createQrCodes = await Promise.all([
      {
        title: 'facebook',
        url: 'https://www.facebook.com'
      },
      {
        title: 'google',
        url: 'https://www.google.com/'
      }
    ].map(qrcode => (
      request(app).post('/qrcodes')
        .send(qrcode)
    )));

    return request(app)
      .get('/qrcodes')
      .then(res => {
        createQrCodes.forEach(qrcode => {
          expect(res.body).toContainEqual(qrcode.body);
        })
      })
  })
});

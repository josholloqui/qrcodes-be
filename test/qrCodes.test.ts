import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/sequelize';

describe('POST to qrcodes', () => {
  beforeEach(async () => { await sequelize.sync({ force: true }); })
  it('should return 201 CREATED', async () => {
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
  });

  it('should find qrcode by id', async () => {
    const newQrCode = await request(app).post('/qrcodes')
      .send({
        title: 'Twitter',
        url: 'https://twitter.com'
      });

    const foundQrCode = await request(app)
      .get(`/qrcodes/${newQrCode.body.id}`)
    expect(foundQrCode.body).toEqual(newQrCode.body);
  });

  it('should update a qrcode by its id', async () => {
    const newQrCode = await request(app).post('/qrcodes')
      .send({
        title: 'Twitter',
        url: 'https://twitter.com'
      });

    await request(app)
      .put(`/qrcodes/${newQrCode.body.id}`)
      .send({
        title: 'Twitter3',
        url: 'https://twitter.com'
      });

    return request(app)
      .get(`/qrcodes/${newQrCode.body.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          title: 'Twitter3',
          url: 'https://twitter.com',
          qr_code: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      })
  });

  it('should return 200 OK', async () => {
    const createQrCode = await request(app).post('/qrcodes')
      .send({
        title: 'Twitter',
        url: 'https://twitter.com'
      });

    const response = await request(app)
      .delete(`/qrcodes/${createQrCode.body.id}`)
      .expect(202);
  });
});

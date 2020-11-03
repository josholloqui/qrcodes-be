import { Router } from 'express';
import QrCode from '../models/qrcode';

export const qrCodes = Router();

qrCodes.post('/', async (req, res, next) => {
  try {
    const qrCode = await QrCode.create({
      title: req.body.title,
      url: req.body.url,
      qr_code: `https://qrtag.net/api/qr_5.png?url=${req.body.url}`
    });
    res.status(201).json(qrCode)
  } catch (e) {
    next(e);
  }
});

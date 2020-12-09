import { Router } from 'express';
import QrCode from '../models/qrcode';

export const qrCodes = Router();

qrCodes
  .post('/', async (req, res, next) => {
    try {
      const createQrCode = await QrCode.create({
        title: req.body.title,
        url: req.body.url,
        qr_code: `https://qrtag.net/api/qr_5.png?url=${req.body.url}`
      });
      res.status(201).json(createQrCode)
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (_req, res, next) => {
    try {
      const getAllQrCodes = await QrCode.findAll();
      res.status(200).json(getAllQrCodes);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const getQrCode = await QrCode.findByPk(req.params.id);
      res.status(200).json(getQrCode)
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updateQrCode = await QrCode.update(
        {
          title: req.body.title,
          url: req.body.url
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
      res.status(202).json(updateQrCode)
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const deleteQrCode = await QrCode.destroy({
        where: {
          id: req.params.id
        }
      });
      res.status(202).json(deleteQrCode);
    } catch (e) {
      next(e);
    }
  })


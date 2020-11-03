import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { qrCodes } from './routes/qrcodes';

export const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '5mb' }));

app.use('/qrcodes', qrCodes);

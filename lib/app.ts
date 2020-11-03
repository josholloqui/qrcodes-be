import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

export const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '5mb' }));
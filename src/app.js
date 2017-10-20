import express from 'express';
import dotenv from 'dotenv-safe';
import configExpress from './config/express';
import configDatabase from './config/database';
import router from './api/index';

dotenv.config();

const app = express();

configExpress(app);
/* eslint-disable object-curly-newline */
const { DB_BASE, DB_HOST, DB_USER, DB_PWD } = process.env;
configDatabase.connectToDatabase(DB_BASE, DB_HOST, DB_USER, DB_PWD);

app.use(router);

app.listen(process.env.PORT);

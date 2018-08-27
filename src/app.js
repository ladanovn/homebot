import express from 'express';
import bodyParser from 'body-parser';
import mongoose from'mongoose';
import morgan from 'morgan';
import jwt from'jsonwebtoken';

import User from './models/user';
import Device from './models/device'

import config from 'config';
import db from './db/db';
import routes from './routes';

import path from 'path';
import swagger from './helpers/swagger.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/api/v1', routes);

// serve swagger
app.use("/", express.static(path.join(__dirname, '/../public')));
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swagger.spec);
});

const port = process.env.PORT || config.server.port;
app.listen(port);
console.log('Node + Express REST API skeleton server started on port: ' + port);

module.exports = app;
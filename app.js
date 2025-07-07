const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const publicRoutes = require('./routes/public');
const ticketRoutes = require('./routes/tickets');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'html');

app.use('/', publicRoutes);
app.use('/tickets', ticketRoutes);

module.exports = app;

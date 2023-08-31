const Application = require('./app/server');

require('dotenv').config();

const DB_URL = 'mongodb://localhost:27017/project-manager';

new Application(3000, DB_URL);
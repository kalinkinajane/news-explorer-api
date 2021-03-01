require('dotenv').config();

const {
  PORT, NODE_ENV, JWT_SECRET, DB_URL,
} = process.env;
const port = (NODE_ENV === 'production' && PORT) ? PORT : '3000';
const jwtSecret = (NODE_ENV === 'production' && JWT_SECRET) ? JWT_SECRET : 'dev-secret';
const dbUrl = (NODE_ENV === 'production' && DB_URL) ? DB_URL : 'mongodb://localhost:27017/diplomadb';

const regExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

module.exports = {
  PORT: port,
  JWT_SECRET: jwtSecret,
  DB_URL: dbUrl,
  regExp,
};

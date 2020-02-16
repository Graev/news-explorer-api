const { NODE_ENV } = process.env;
const JWT_TOKEN =
  NODE_ENV === 'production' ? process.env.JWT_TOKEN : 'dev-super-secret';
const PORT = 3000;
const DATABASE_URL =
  process.env.SERVER_URL || 'mongodb://localhost:27017/news-explorer-db';

module.exports = { JWT_TOKEN, PORT, DATABASE_URL };

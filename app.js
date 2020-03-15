const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const routerIndex = require('./routes/index');
const notFound = require('./constants/constants');

const { PORT, DATABASE_URL } = require('./config');
const { NotFoundError } = require('./errorsCatch/errorsCatch');
const { requestLogger, errorsLogger } = require('./middlewares/logger');
const routerError = require('./middlewares/errors');

const app = express();
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   next();
// });
app.use(
  cors({
    credentials: true,
  })
);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(requestLogger);

app.use('/', routerIndex);

app.all('/*', (req, res, next) => {
  const err = new NotFoundError(notFound);
  next(err);
});

app.use(errorsLogger);
app.use(errors());

app.use(routerError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

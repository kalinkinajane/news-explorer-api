const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routers = require('./routes/index');
const { PORT, DB_URL } = require('./configs/index');
const errorHandler = require('./middelwares/errorHandler');
const limiter = require('./middelwares/rateLimit');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { requestLogger, errorLogger } = require('./middelwares/logger');

mongoose.connect(`mongodb:${DB_URL}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
// const allowedCors = [
//   'https://nomoreparties.co/news/v2',
//   'localhost:3000',
//   'https://kalinkinadiplom.students.nomoredomains.rocks',
// ];
// app.use(cors({
//   origin: allowedCors,
// }));
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.use('/', routers);

// app.use('*', (req, res) => {
//   res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
// });
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);
app.listen(PORT, () => console.log(`listening to ${PORT}`));

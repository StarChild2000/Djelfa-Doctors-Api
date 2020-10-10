const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitizer = require('express-mongo-sanitize');
const limit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');

const doctorsRouter = require('./routes/doctorRoutes');
const reportRouter = require('./routes/reportRoutes');
const requestRouter = require('./routes/requestRoutes');
const usersRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());
app.use(cors());

// security middlewars
app.use(helmet());
app.use(xss());
app.use(mongoSanitizer());
app.use(
  limit({
    max: 1000,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/doctors', doctorsRouter);
app.use('/api/v1/reports', reportRouter);
app.use('/api/v1/requests', requestRouter);
app.use('/api/v1/users', usersRouter);

app.use(globalErrorHandler);

module.exports = app;

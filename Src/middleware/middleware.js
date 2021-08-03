const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

// setup global middleware here
module.exports = (app) => {
  app.use(cors());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
};

const express = require('express');

const app = express();
const db = require('./models/db');

const port = process.env.PORT || 9020;

const runningMessage = `Galvanize ProductCatlog API V1 Running on port ${port}.`;

// setup the Express middlware
require('./middleware/middleware')(app);

// setup the api
require('./api/api.routes')(app);

app.server = db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(runningMessage);
  });
});

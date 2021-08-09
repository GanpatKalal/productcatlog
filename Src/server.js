const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerDefinition = require('./docs/api.info');

const productName = 'Galvanize ProductCatlog API V1';

const app = express();
const db = require('./models/db');

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./api/product/*.routes*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const port = process.env.PORT || 9050;

const runningMessage = `${productName} Running on port ${port}.`;

// setup the Express middlware
require('./middleware/middleware')(app);

// setup the api
require('./api/api.routes')(app);

// this will serve your swagger.json file using express
app.use(express.static(`${__dirname}`));
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.server = db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(runningMessage);
  });
});

module.exports = app;

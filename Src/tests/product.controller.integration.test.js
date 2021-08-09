const chai = require('chai');
const chaihttp = require('chai-http');
const request = require('supertest');

process.env.ENV = 'Test';
process.env.PORT = 9050;

chai.should();
chai.use(chaihttp);

describe('App route tests ', () => {
  let agent;
  let db;
  let app;
  beforeEach(() => {
    app = require('../server');
    db = require('../models/db');
    agent = request.agent(app);
  });
  it('getAllProducts test -should get all products', (done) => {
    agent.get('/api/product').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
  afterEach((done) => {
    console.log('afterEach done');
    done();
  });
  after((done) => {
    console.log('after done');
    db.sequelize.close();
    app.server.close(done());
  });
});

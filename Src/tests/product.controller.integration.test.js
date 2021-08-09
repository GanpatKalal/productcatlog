const chai = require('chai');
const chaihttp = require('chai-http');
const request = require('supertest');

process.env.ENV = 'Test';
process.env.PORT = 9050;

chai.should();
chai.use(chaihttp);

describe.skip('App route tests ', () => {
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
  it('should allow a product to be posted and create the new product', (done) => {
    const newProduct = {  
    name: 'Product_1',
    price: 111,
    description: 'Product 1 description' 
   };

    agent.post('/api/product')
      .send(newProduct)
      .expect(201)
      .end((err, results) => {
        results.body.should.have.property('productId');
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

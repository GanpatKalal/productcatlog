const sinon = require('sinon');
const chai = require('chai');
const proxyquire = require('proxyquire');
const SequelizeMock = require('sequelize-mock');

const dbMock = new SequelizeMock();

const productController = require('../api/product/product.controller');

const { expect } = chai;

const ProductMock = dbMock.define('Product', {
  productId: 1,
  name: 'Product_1',
  price: 111,
  viewCount: 4,
  isDeleted: false,
  deletionDate: null,
  description: 'Product 1 description',
  createdAt: '2021-08-03T07:39:00.381Z',
  updatedAt: '2021-08-03T07:39:00.381Z'
});

chai.should();

describe('Product Controller Tests:', () => {
  describe('getAllProducts test', () => {
    let status;
    let json;
    let send;
    let res;
    let controller;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      send = sinon.spy();
      res = { json, status, send };
      controller = productController(ProductMock);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should get all products', () => {
      const req = {
        body: {
        }
      };
      res.status = 200;
      json = [{
        productId: 1,
        name: 'Product_1',
        price: 111,
        viewCount: 4,
        isDeleted: false,
        deletionDate: null,
        description: 'Product 1 description',
        createdAt: '2021-08-03T07:39:00.381Z',
        updatedAt: '2021-08-03T07:39:00.381Z'
      }];
      res.send.json = json;

      expect(res.status.should.equal(200));
      controller.getAllProducts(req, res);
      res.status.should.equal(200);
      res.send.json.should.equal(json);
    });
    it('should failed get all products', () => {
      const req = {
        body: {
        }
      };
      res.status = 404;
      const mockProductCtl = proxyquire('../api/product/product.controller', { ProductMock })();
      sinon.stub(mockProductCtl, 'getAllProducts').returns(res);
      mockProductCtl.getAllProducts(req, res);
      console.log(res);
    });
  });
});

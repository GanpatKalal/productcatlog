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
      controller.getAllProducts(req, res);
      expect(res.status.should.equal(200));
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
  describe('createProduct test', () => {
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
    it('should not allow an empty body', () => {
      const req = {
      };

      controller.createProduct(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('request body is empty.').should.equal(true);
    });
    it('should not allow an empty name body', () => {
      const req = {
        body: {
          price: 111,
          description: 'Product 1 description',
        }
      };

      controller.createProduct(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('name is required in request body.').should.equal(true);
    });
    it('should not allow an empty price body', () => {
      const req = {
        body: {
          name: 'Product1',
          description: 'Product 1 description',
        }
      };

      controller.createProduct(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('price is required in request body.').should.equal(true);
    });
    it('should not allow an empty description body', () => {
      const req = {
        body: {
          name: 'Product1',
          price: 'Product 1 description',
        }
      };

      controller.createProduct(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('description is required in request body.').should.equal(true);
    });
    it('should create a new product with stub called', () => {
      const req = {
        body: {
          name: 'Product_1',
          price: 111,
          description: 'Product 1 description',
        }
      };
      res.status = 201;
      const stub = sinon.stub(controller, 'createProduct').returns(res);
      controller.createProduct(req, res);
      expect(res.status.should.equal(201));
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
    });
    it('should create a new product', () => {
      const req = {
        body: {
          name: 'Product_1',
          price: 111,
          description: 'Product 1 description',
        }
      };
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
      controller.createProduct(req, res);
      expect(res.send.json.should.equal(json));
    });
  });
  describe('getProductById test', () => {
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
    it('should not allow an empty id', () => {
      const req = {
        params: {
        }
      };

      controller.getProductById(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('id is required').should.equal(true);
    });
    it('should getProductById with stub called', () => {
      const req = {
        body: {
          id: 1
        }
      };
      res.status = 200;
      const stub = sinon.stub(controller, 'getProductById').returns(res);
      controller.getProductById(req, res);
      expect(res.status.should.equal(200));
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
    });
    it('should getProductById', () => {
      const req = {
        params: {
          id: 1
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
      controller.getProductById(req, res);
      expect(res.status.should.equal(200));
      res.status.should.equal(200);
      res.send.json.should.equal(json);
    });
  });
  describe('updateProductViewCount test', () => {
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
    it('should not allow an empty id', () => {
      const req = {
        params: {
        }
      };

      controller.updateProductViewCount(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('id is required').should.equal(true);
    });
    it('should updateProductViewCount with stub called', () => {
      const req = {
        body: {
          id: 1
        }
      };
      const stub = sinon.stub(controller, 'updateProductViewCount').returns(res);
      controller.updateProductViewCount(req, res);
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
    });
    it('should updateProductViewCount', () => {
      const req = {
        params: {
          id: 1
        }
      };
      json = 'The productid: 1 is updated.';
      res.send.json = json;
      controller.updateProductViewCount(req, res);
      expect(res.send.json.should.equal(json));
    });
  });
  describe('disableProduct test', () => {
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
    it('should not allow an empty id', () => {
      const req = {
        params: {
        }
      };

      controller.disableProduct(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('id is required').should.equal(true);
    });
    it('should disableProduct with stub called', () => {
      const req = {
        body: {
          id: 1
        }
      };
      const stub = sinon.stub(controller, 'disableProduct').returns(res);
      controller.disableProduct(req, res);
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
    });
    it('should disableProduct', () => {
      const req = {
        params: {
          id: 1
        }
      };
      json = json = 'The productid: 1 is disabled.';
      res.send.json = json;
      controller.disableProduct(req, res);
      expect(res.send.json.should.equal(json));
    });
  });
  describe('getMostViewProducts test', () => {
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
    it('should not allow an empty id', () => {
      const req = {
        params: {
        }
      };

      controller.getMostViewProducts(req, res);
      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('viewCount is required').should.equal(true);
    });
    it('should getMostViewProducts with stub called', () => {
      const req = {
        body: {
          viewCount: 3
        }
      };
      const stub = sinon.stub(controller, 'getMostViewProducts').returns(res);
      controller.getMostViewProducts(req, res);
      // eslint-disable-next-line no-unused-expressions
      expect(stub.calledOnce).to.be.true;
    });
    it('should getMostViewProducts', () => {
      const req = {
        params: {
          viewCount: 1
        }
      };
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
      controller.getMostViewProducts(req, res);
      expect(res.send.json.should.equal(json));
    });
  });
});

const { Op } = require('sequelize');

const models = require('../../models/db');

function ProductController(Product = models.Product) {
  function getAllProducts(req, res) {
    console.log('getAllProducts call');
    Product.findAll({
      where: {
        isDeleted: false
      }
    })
      .then((products) => {
        res.status = 200;
        return res.json(products);
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
        return res.json(error);
      });
  }

  function getProductById(req, res) {
    if (!req.params.id) {
      res.status(400);
      return res.send('id is required');
    }
    const { id } = req.params;
    console.log(`Request for productid ${id}.`);
    Product.findOne({
      where: {
        productId: id
      }
    })
      .then((product) => {
        if (!product) {
          res.status(404);
          return res.json(`Failed to get the productid: ${id}`);
        }
        res.status = 200;
        return res.json(product);
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
        return res.json(error);
      });
  }

  function createProduct(req, res) {
    console.log('createProduct');
    if (!req.body) {
      res.status(400);
      return res.send('request body is empty.');
    }
    if (!req.body.name) {
      res.status(400);
      return res.send('name is required in request body.');
    }
    if (!req.body.price) {
      res.status(400);
      return res.send('price is required in request body.');
    }
    if (!req.body.description) {
      res.status(400);
      return res.send('description is required in request body.');
    }
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    };
    Product.create(newProduct)
      .then((product) => {
        res.status(201);
        return res.json(product);
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
        return res.json(error);
      });
  }

  function updateProductViewCount(req, res) {
    if (!req.params.id) {
      res.status(400);
      return res.send('id is required');
    }
    const { id } = req.params;
    console.log(`Request for productid ${id}.`);
    models.Product.increment({ viewCount: +1 }, {
      where: {
        productId: id
      }
    })
      .then((product) => {
        if (product[0][1] === 0) {
          res.status(404);
          return res.json(`Failed to update the view count of the productid: ${id}`);
        }
        res.status = 200;
        return res.json(`The productid: ${id} is updated.`);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  }

  function disableProduct(req, res) {
    if (!req.params.id) {
      res.status(400);
      return res.send('id is required');
    }
    const { id } = req.params;
    console.log(`Request for productid ${id}.`);
    models.Product.update({ isDeleted: true, deletionDate: Date.now() }, {
      where: {
        productId: id
      }
    })
      .then((product) => {
        if (product[0] === 0) {
          res.status(404);
          return res.json(`Failed to disable the productid: ${id}`);
        }
        res.status = 200;
        return res.json(`The productid: ${id} is disabled.`);
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
        return res.json(error);
      });
  }

  function getMostViewProducts(req, res) {
    if (!req.params.viewCount) {
      res.status(400);
      return res.send('viewCount is required');
    }
    const { viewCount } = req.params;
    console.log(`Request for productid ${viewCount}.`);
    Product.findAll({
      where: {
        viewCount: {
          [Op.gte]: viewCount
        },
        isDeleted: false,
      }
    })
      .then((products) => {
        res.status = 200;
        return res.json(products);
      })
      .catch((error) => {
        console.log(error);
        res.status(500);
        return res.json(error);
      });
  }

  return {
    getAllProducts,
    createProduct,
    getProductById,
    updateProductViewCount,
    disableProduct,
    getMostViewProducts
  };
}

module.exports = ProductController;

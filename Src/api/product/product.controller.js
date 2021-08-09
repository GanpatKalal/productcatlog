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
        res.status(404).send(error);
      });
  }

  function disableProduct(req, res) {
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

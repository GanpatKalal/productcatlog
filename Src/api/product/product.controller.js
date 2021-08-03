const { Op } = require('sequelize');

const models = require('../../models/db');

exports.getAllProducts = (req, res) => {
  models.Product.findAll({
    where: {
      isDeleted: false
    }
  })
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
};

exports.createProduct = (req, res) => {
  const newProduct = req.body;
  console.log(`Request for new product ${newProduct}.`);
  models.Product.create({
    name: newProduct.name,
    price: newProduct.price,
    description: newProduct.description
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  console.log(`Request for productid ${id}.`);
  models.Product.findOne({
    where: {
      uuid: id
    }
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
};

exports.updateProductViewCount = (req, res) => {
  const { id } = req.params;
  console.log(`Request for productid ${id}.`);
  models.Product.increment({ viewCount: +1 }, {
    where: {
      uuid: id
    }
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
};

exports.disableProduct = (req, res) => {
  const { id } = req.params;
  console.log(`Request for productid ${id}.`);
  models.Product.update({ isDeleted: true, deletionDate: Date.now() }, {
    where: {
      uuid: id
    }
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
};

exports.getMostViewProducts = (req, res) => {
  const { viewCount } = req.params;
  console.log(`Request for productid ${viewCount}.`);
  models.Product.findAll({
    where: {
      viewCount: {
        [Op.gte]: viewCount
      },
      isDeleted: false,
    }
  })
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
};

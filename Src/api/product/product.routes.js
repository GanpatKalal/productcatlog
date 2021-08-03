const express = require('express');

const controller = require('./product.controller');

const router = express.Router();

router.get('/', controller.getAllProducts);
router.post('/', controller.createProduct);
router.get('/getProductById/:id', controller.getProductById);
router.get('/getMostViewProducts/:viewCount', controller.getMostViewProducts);
router.put('/:id', controller.updateProductViewCount);
router.delete('/:id', controller.disableProduct);
module.exports = router;

const express = require('express');

const productController = require('./product.controller');

const router = express.Router();

const controller = productController();

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products.
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Success *
 */
router.get('/', controller.getAllProducts);

/**
 * @swagger
 * /api/product/getProductById/{id}:
 *   get:
 *     summary: Retrieve a single product.
 *     description: Retrieve a single Product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *        description: Success
 */
router.get('/getProductById/:id', controller.getProductById);

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: New product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
*/
router.post('/', controller.createProduct);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update the product view count.
 *     description: Update the product view count.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product for updating the view count of product.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *        description: Success
 */
router.put('/:id', controller.updateProductViewCount);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Disable the product.
 *     description: Disable the product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product for disabling the product.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *        description: Success
 */
router.delete('/:id', controller.disableProduct);

/**
 * @swagger
 * /api/product/getMostViewProducts/{viewCount}:
 *   get:
 *     summary: Retrieve the most viewed product on and above the view count.
 *     description: Retrieve the most viewed product.
 *     parameters:
 *       - in: path
 *         name: viewCount
 *         required: true
 *         description: viewCount.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *        description: Success
 */
router.get('/getMostViewProducts/:viewCount', controller.getMostViewProducts);

module.exports = router;

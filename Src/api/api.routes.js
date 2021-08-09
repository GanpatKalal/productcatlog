// api router will mount other routers
module.exports = (app) => {
  app.use('/api/product', require('./product/product.routes'));
};

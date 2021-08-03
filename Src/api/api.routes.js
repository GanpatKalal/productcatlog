// api router will mount other routers
module.exports = (app) => {
  app.get('/', (req, res) => { res.send('Welcome to Galvanize ProductCatlog Services'); });
  app.use('/api/product', require('./product/product.routes'));
};

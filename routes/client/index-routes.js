const products_routes = require('./product-routes');
const home_routes = require('./home-routes');

module.exports = (app) => {
    app.use('/', home_routes);

    app.use('/products', products_routes);
};
const dashboard_routes = require('./dashboard-route');
const product_routes = require('./product-route');
const SystemConfig = require('../../config/system');

module.exports = (app) => {
    const PATH_ADMIN = SystemConfig.prefixAdmin;
    app.use( PATH_ADMIN + '/dashboard', dashboard_routes);

    app.use( PATH_ADMIN + '/product',  product_routes);
};
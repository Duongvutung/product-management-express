const express = require('express');
const router = express.Router();

const productsController = require('../../controller/client/product-controller');
router.get('/', productsController.index);
module.exports = router;
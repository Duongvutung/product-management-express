const express = require('express');
const router = express.Router();

const controller = require('../../controller/client/home-controller');
router.get('/', controller.index);
router.get('/', (req, res) => {
    res.render('./client/pages/home/index');
});

module.exports = router;
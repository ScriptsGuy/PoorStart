const path = require('path');

const express = require('express');

const shopConroller = require('../controllers/shop');

const router = express.Router();

router.get('/', shopConroller.getIndex);
router.get('/products', shopConroller.getProducts);
router.get('/cart', shopConroller.getCart);
router.get('/checkout', shopConroller.getcheckout);

module.exports = router;

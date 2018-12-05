const path = require('path');

const express = require('express');

const shopConroller = require('../controllers/shop');

const router = express.Router();

router.get('/', shopConroller.getIndex);
router.get('/products', shopConroller.getProducts);
router.get('/products/:productId', shopConroller.getProduct);
router.get('/cart', shopConroller.getCart);
router.post('/cart', shopConroller.postCart);
router.get('/orders', shopConroller.getOrders);
router.get('/checkout', shopConroller.getcheckout);

module.exports = router;

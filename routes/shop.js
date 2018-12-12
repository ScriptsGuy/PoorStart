const path = require('path');

const express = require('express');

const shopConroller = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');


const router = express.Router();

router.get('/', shopConroller.getIndex);
router.get('/products', shopConroller.getProducts);
router.get('/products/:productId', shopConroller.getProduct);
router.get('/wishlist', isAuth, shopConroller.getWishlist);
router.post('/wishlist', isAuth, shopConroller.postWishList);
router.post('/cart-delete-item', isAuth, shopConroller.postWishListDelete);
// router.get('/orders', shopConroller.getOrders);
// router.get('/checkout', shopConroller.getcheckout);

module.exports = router;

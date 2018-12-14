const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// // /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);
router.get('/products', isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post(
  '/add-product',
  [
    body('name')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 4000 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
router.post(
  '/edit-product',
  [
    body('name')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 4000 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;

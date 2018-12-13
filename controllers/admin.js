/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
const colors = require('colors');
const Product = require('../models/product');
const WishList = require('../models/wishlist');


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,

  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const productType = req.body.productType;
  const description = req.body.description;
  const product = new Product({
    name, price, imageUrl, productType, description, userId: req.user,
  });
  // console.log(product);
  product.save()
    .then((result) => {
      console.log('Created Product!!'.bgCyan.black);
      res.redirect('/admin/products');
    }).catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  // console.log(editMode);
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId).then((product) => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      // eslint-disable-next-line object-shorthand
      product: product,

    });
  }).catch((err) => {
    console.log(err);
  });
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedProductType = req.body.productType;
  const updatedDescription = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.name = updatedName;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.productType = updatedProductType;
      product.description = updatedDescription;
      return product.save().then((result) => {
        console.log('updates product!!');
        res.redirect('/admin/products');
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  // eslint-disable-next-line no-underscore-dangle
  Product.find({ userId: req.user._id }).then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'admin products',
      path: '/admin/products',

    });
  }).catch((err) => {
    console.log(err);
  });
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId, userId: req.user._id }).then(() => {
    console.log('destroyed product'.bgRed.black.bold);
    req.user
      .removeWishList(prodId)
      .then((result) => {
        console.log('removed from wishlist'.red);
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect('/admin/products');
  }).catch((err) => {
    console.log(err);
  });
};

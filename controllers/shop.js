const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  Product.fetchAll((products) => {
    // console.log(products);
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'all products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      // eslint-disable-next-line object-shorthand
      product: product,
      pageTitle: product.name,
      path: '/products',
    });
  });
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  console.log(prodId);
  res.redirect('/cart');
};

exports.getIndex = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  Product.fetchAll((products) => {
    // console.log(products);
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
  });
};
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getcheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
  });
};

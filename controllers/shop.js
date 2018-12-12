const Product = require('../models/product');
const WishList = require('../models/wishlist');

exports.getProducts = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  Product.find().then((products) => {
    console.log(products.toString().bgWhite.black);
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'all products',
      path: '/products',
      isAuthenticated: req.session.isLoggedIn,
    });
  }).catch((err) => {
    console.log(err);
  });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then((product) => {
    res.render('shop/product-detail', {
      // eslint-disable-next-line object-shorthand
      product: product,
      pageTitle: product.name,
      path: '/products',
      isAuthenticated: req.session.isLoggedIn,
    });
  }).catch((err) => {
    console.log(err);
  });
};


exports.getIndex = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  Product.find().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      isAuthenticated: req.session.isLoggedIn,
      csrfToken: req.csrfToken(),
    });
  }).catch((err) => {
    console.log(err);
  });
};

exports.getWishlist = (req, res, next) => {
  req.user
    .populate('wishList.items.productId')
    .execPopulate()
    .then((user) => {
      console.log(user.wishList.items);
      const products = user.wishList.items;
      res.render('shop/wishlist', {
        path: '/wishlist',
        pageTitle: 'Your WishList',
        // eslint-disable-next-line object-shorthand
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postWishList = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => req.user.addToWishList(product))
    .then((result) => {
      console.log(result);
      res.redirect('/wishlist');
    });
};

exports.postWishListDelete = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeWishList(prodId)
    .then((result) => {
      res.redirect('/wishlist');
    })
    .catch((err) => {
      console.log(err);
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

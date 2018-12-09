const Product = require('../models/product');
const WishList = require('../models/wishlist');

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

exports.getWishlist = (req, res, next) => {
  WishList.getWishList((wishList) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = wishList.products.find((prod) => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/wishlist', {
        path: '/wishList',
        pageTitle: 'Your Cart',
        products: cartProducts,
      });
    });
  });
};

exports.postWishList = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    WishList.addProduct(prodId, product.price);
  });
  res.redirect('/wishlist');
};

exports.postWishListDelete = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    WishList.deleteProduct(prodId, product.price);
    res.redirect('/wishlist');
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

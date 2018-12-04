/* eslint-disable prefer-destructuring */
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const productType = req.body.productType;
  const description = req.body.description;
  const product = new Product(name, price, imageUrl, productType, description);
  console.log(product);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  Product.fetchAll((products) => {
    console.log(products);
    res.render('admin/products', {
      prods: products,
      pageTitle: 'admin products',
      path: '/admin/products',
    });
  });
};

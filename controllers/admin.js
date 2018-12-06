/* eslint-disable prefer-destructuring */
const Product = require('../models/product');

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
  const product = new Product(
    null,
    name,
    price,
    imageUrl,
    productType,
    // eslint-disable-next-line comma-dangle
    description
  );
  // console.log(product);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  // console.log(editMode);
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
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
  });
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedProductType = req.body.productType;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedName,
    updatedPrice,
    updatedImageUrl,
    updatedProductType,
    // eslint-disable-next-line comma-dangle
    updatedDescription
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  Product.fetchAll((products) => {
    // console.log(produ cts);
    res.render('admin/products', {
      prods: products,
      pageTitle: 'admin products',
      path: '/admin/products',
    });
  });
};

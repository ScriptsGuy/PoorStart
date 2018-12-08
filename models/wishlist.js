const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'wishList.json',
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous wishList
    fs.readFile(p, (err, fileContent) => {
      let wishList = { products: [], totalPrice: 0 };
      if (!err) {
        wishList = JSON.parse(fileContent);
      }
      // Analyze the wishList => Find existing product
      const existingProductIndex = wishList.products.findIndex((prod) => prod.id === id);
      const existingProduct = wishList.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        wishList.products = [...wishList.products];
        wishList.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        wishList.products = [...wishList.products, updatedProduct];
      }
      wishList.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(wishList), (err) => {
        console.log(err);
      });
    });
  }
};
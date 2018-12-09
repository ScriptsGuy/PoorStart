const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  wishList: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      },
    ],
  },
});

module.exports = mongoose.model('User', userSchema);


// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'wishList.json',
// );

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     // Fetch the previous wishList
//     fs.readFile(p, (err, fileContent) => {
//       let wishList = { products: [], totalPrice: 0 };
//       if (!err) {
//         wishList = JSON.parse(fileContent);
//       }
//       // Analyze the wishList => Find existing product
//       const existingProductIndex = wishList.products.findIndex((prod) => prod.id === id);
//       const existingProduct = wishList.products[existingProductIndex];
//       let updatedProduct;
//       // Add new product/ increase quantity
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty += 1;
//         wishList.products = [...wishList.products];
//         wishList.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id, qty: 1 };
//         wishList.products = [...wishList.products, updatedProduct];
//       }
//       wishList.totalPrice += +productPrice;
//       fs.writeFile(p, JSON.stringify(wishList), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         return;
//       }
//       const updatedCart = { ...JSON.parse(fileContent) };
//       const product = updatedCart.products.find((prod) => prod.id === id);
//       if (!product) {
//         return;
//       }
//       const productQty = product.qty;
//       updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
//       updatedCart.totalPrice -= productPrice * productQty;

//       fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static getWishList(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       const wishList = JSON.parse(fileContent);
//       if (err) {
//         cb(null);
//       } else {
//         cb(wishList);
//       }
//     });
//   }
// };

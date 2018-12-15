/* eslint-disable func-names */
const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,

  wishList: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
      }
    ]
  }
});

userSchema.methods.addToWishList = function(product) {
  const WishListProductIndex = this.wishList.items.findIndex(
    // eslint-disable-next-line no-underscore-dangle
    (cp) => cp.productId.toString() === product._id.toString()
  );
  const updatedWishListItems = [...this.wishList.items];

  if (WishListProductIndex >= 0) {
    console.log('this wish is already fullfilled!!');
  } else {
    updatedWishListItems.push({
      // eslint-disable-next-line no-underscore-dangle
      productId: product._id
    });
  }
  const updatedWishList = {
    items: updatedWishListItems
  };
  this.wishList = updatedWishList;
  return this.save();
};

userSchema.methods.removeWishList = function(productId) {
  // eslint-disable-next-line arrow-body-style
  const updatedProduct = this.wishList.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });
  this.wishList.items = updatedProduct;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'wishList.json',
// );

// module.exports = class WishList {
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
//       const updatedWishList = { ...JSON.parse(fileContent) };
//       const product = updatedWishList.products.find((prod) => prod.id === id);
//       if (!product) {
//         return;
//       }
//       const productQty = product.qty;
//       updatedWishList.products = updatedWishList.products.filter((prod) => prod.id !== id);
//       updatedWishList.totalPrice -= productPrice * productQty;

//       fs.writeFile(p, JSON.stringify(updatedWishList), (err) => {
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

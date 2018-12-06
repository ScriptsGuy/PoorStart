const fs = require('fs');
const path = require('path');

const dataPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  // eslint-disable-next-line comma-dangle
  'products.json'
);

const getProductsFromFile = (cb) => {
  fs.readFile(dataPath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, name, price, imageUrl, productType, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.productType = productType;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        // eslint-disable-next-line arrow-parens
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(dataPath, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(dataPath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      // eslint-disable-next-line no-shadow
      const product = products.find((dataPath) => dataPath.id === id);
      cb(product);
    });
  }
};

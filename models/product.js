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
  constructor(name, price, imageUrl, productType, description) {
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.productType = productType;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(dataPath, JSON.stringify(products), (err) => {
        console.log(err);
      });
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

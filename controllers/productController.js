const Product = require('../models/productModel');

const { getPostData } = require('../utils');

// @desc gets all products
// @route GET /api/prducts
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (err) {
    console.log(err);
  }
}

// @desc gets single product
// @route GET /api/prducts/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (err) {
    console.log(err);
  }
}

// @desc create a product
// @route POST /api/prducts
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);
    const product = {
      title,
      description,
      price,
    };
    const newProduct = await Product.create(product);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (err) {
    console.log(err);
  }
}
// @desc UPDATE a product
// @route Put /api/prducts/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };
      const updProduct = await Product.update(id, productData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updProduct));
    }
  } catch (err) {
    console.log(err);
  }
}

// @desc delete  product
// @route DELETE /api/prducts/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'product not found' }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `product ${id} removed` }));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

const express = require("express");
const products = require('../controllers/product.controller')

const productRoute=express.Router();

productRoute.route('/')
    .get(products.findAll)
    .post(products.create);
productRoute.route('/:id')
    .delete(products.delete);

module.exports= productRoute;
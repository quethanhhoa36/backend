const express = require("express");
const carts = require('../controllers/cart.controller')

const cartRoute=express.Router();

cartRoute.route('/')
    .post(carts.create);

module.exports=cartRoute
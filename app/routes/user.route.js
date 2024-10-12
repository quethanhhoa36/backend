const express = require("express");
const users = require('../controllers/user.controller')

const userRoute=express.Router();

userRoute.route("/")
    .get(users.findAll)
    .post(users.create)
    .delete(users.deleteAll);
module.exports = userRoute;
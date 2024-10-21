const express = require("express");
const users = require('../controllers/user.controller')

const userRoute=express.Router();

userRoute.route("/")
    .get(users.findAll)
    .post(users.create)
    .delete(users.deleteAll);
userRoute.route("/:id")
    .post(users.update)
    .delete(users.delete)
    .get(users.findOne);
module.exports = userRoute;
const express = require("express");
const users = require('../controllers/user.controller')

const userRoute=express.Router();

userRoute.route("/")
    .get(users.findAll)
    .post(users.create)
    .delete(users.deleteAll);
userRoute.route('/by/pages')
    .get(users.getByPage);
userRoute.route("/login")
    .post(users.login)
userRoute.route("/:id")
    .put(users.update)
    .delete(users.delete)
    .get(users.findOne);

module.exports = userRoute;
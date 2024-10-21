const authRoute = require('express').Router();
const auth = require('../controllers/auth.controller')

authRoute.route("/register")
    .post(auth.registerUser)
module.exports = authRoute;
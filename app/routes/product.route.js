const express = require("express");
const products = require('../controllers/product.controller')

const multer = require('multer')
const path = require('path');



// Cấu hình diskStorage để lưu file vào thư mục 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // thư mục lưu file
    },
    filename: function (req, file, cb) {
        // Đặt tên file với timestamp và tên gốc của file
        cb(null, Date.now() + '-' + file.originalname);
    }

});

const upload = multer({ 
    storage: storage
 });



const productRoute=express.Router();

productRoute.route('/')
    .get(products.findAll)
    .post(upload.single('image'),products.create);
productRoute.route('/by/pages')
    .get(products.getByPage);
productRoute.route('/:id')
    .get(products.findOne)
    .put(upload.single('image'),products.update)
    .delete(products.delete);

module.exports= productRoute;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname:{
        type: String,
        require: true,
    },
    description:{
        type:String,
        require:true,
    },
    image:{
        data: String,
        contentType: String
    },
    author:{
        type:String,
        require: true
    },
    category:{
        type:String,
    },
    NXB:{
        type:String,
    },
},{timestamps:true})

module.exports = mongoose.model("product",productSchema)

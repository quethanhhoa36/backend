const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        minlength: 10,
        maxlength: 16,
        unique:true
    },
    email:{
        type: String,
        required: true,
        minlength:11,
        maxlength:25,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
    phone:{
        type:String,
        minlength:10,
    },
    address:{
        type:String
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
}, {timestamps:true});

module.exports = mongoose.model("User",userSchema)
const ApiError = require('../api-error')
const UserService =require('../services/user.service');
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req,res,next)=>{
    if(!req.body?.name){

        return next(new ApiError(400,"Name cannot be empty"));
    }
    try{
        const userService = new UserService(MongoDB.client);
        const documents = await userService.create(req.body);
        return res.send(documents);
    }
    catch(error){
        return next(
            new ApiError(500,"An error occured while creating contact")
        );
    }
}
exports.findAll = async (req,res,next) => {
    let documents = [];
    const userService = new UserService(MongoDB.client);
    documents = await userService.find({});
    return res.send(documents);
}
exports.findOne = (req,res) => {
    res.send({message: "create"});
}
exports.update = (req,res) => {
    res.send({message: "create"});
}
exports.delete = (req,res) => {
    res.send({message: "create"});
}
exports.deleteAll = (req,res) => {
    res.send({message: "create"});
}
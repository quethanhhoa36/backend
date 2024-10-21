const ApiError = require('../api-error')
const User = require('../models/User')


exports.create = async(req,res,next)=>{
    try{
            const {username, email, phone, address,password} = req.body
            User.create({
                username: username,
                email: email,
                phone: phone,
                address: address,
                password:  password
            })
            .then((data) => res.status(200).json(data))
            .catch((err) => {
            res.status(500).json({ massage: `Can't create user ${err}` })
            console.log(err)
        })
    }
    catch(error){
        return next(
            new ApiError(500,"An error occured while creating contact")
        );
    }
}
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name } = req.query;
        if (name) {
            documents = await User.find(name);
        } else {
            documents = await User.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving Users")
        );
    }

    return res.send(documents);
};
exports.findOne = async (req, res, next) => {
    try{
        const document = await User.findById(req.params.id);
        if(!document){
            return next(new ApiError(404,"User not found!"));
        }
        return res.send(document);
    }
    catch (error){ 
        return next(new ApiError(500,`Error retrieving user with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({ message: "User was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating user with id=${req.params.id}`));
    }

};
exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if(!document){
            return next(new ApiError(404,"User not found"));
        }
        return res.send({message:"User was deleted successfully"});
    }
    catch(error){
        return next(new ApiError(500,`Could not delete user with id = ${req.params.id}`));
    }
}
exports.deleteAll = async (req, res, next)=>{
    try{
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({
            message: `${deletedCount} users were deleted successfully`,
        });
    }
    catch(error){
        return next(new ApiError(500,"An error occurred while removing all users"));
    }
}
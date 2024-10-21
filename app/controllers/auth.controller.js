const User = require('../models/User');
const ApiError = require('../api-error')



const authController = {
    registerUser: async(req,res,next) => {
        try{
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                password: req.body.password
            });

            const user= await newUser.save();
            res.status(200).json(user);
        }
        catch(error){
            return next(
            new ApiError(500,"An error occured while creating contact")
        );
        }
    }        
}

module.exports = authController;
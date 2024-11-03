const ApiError = require('../api-error')
const Cart = require('../models/Cart');

exports.create = async(req,res,next) =>{
    const d = new Date();
    d.setDate(d.getDate() + 7);
    Cart.create({
        userId: req.body.userId,
        items: req.body.items,
        duedate: d
    })
    .then((data)=>res.status(200).json(data))
    .catch((error)=> {
        return next(new ApiError(500,`${error.message}`));
    })
}
exports.update = async (req,res,next) =>{

}
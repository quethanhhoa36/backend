const ApiError = require('../api-error')
const Product = require('../models/Porduct');

exports.create = async (req,res,next) =>{
    const {productname, description, img, author, category} = req.body;
    Product.create({
        productname: productname,
        description: description,
        img: img,
        author: author,
        category: category,
    })
    .then((data) => res.status(200).json(data))
    .catch(err =>{
            res.status(500).json({ massage: `Can't create product ${err}` })
            console.log(err)
        })
}
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name } = req.query;
        if (name) {
            documents = await Product.find(name);
        } else {
            documents = await Product.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving Products")
        );
    }

    return res.send(documents);
};
exports.delete = async (req,res,next) =>{
    try{
        await Product.deleteOne({_id:req.params.id})
        return res.send({message:"User was deleted successfully"});
    }
    catch(error){
        return next(new ApiError(500,"An error occured while deleting product"))
    }
}
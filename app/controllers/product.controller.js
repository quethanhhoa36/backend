const ApiError = require('../api-error')
const Product = require('../models/Porduct');
const fs=require('fs')
exports.create = async (req,res,next) =>{
    var data = req.file.path
    const fileBuffer = fs.readFileSync(data);
    const {productname, description, author, category} = req.body;
    await Product.create({
        productname: productname,
        description: description,
        image: {
                data: `data:image/jpeg;base64,${fileBuffer.toString('base64')}`,
                contentType: req.file.mimetype
            },
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

exports.getByPage= async(req,res,next) =>{
    try{
        const {page} = req.query
        Product.find({})
            .skip((page-1)*5).limit(5)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(500).json(err.message))
    }
    catch(error){
        console.log(error)
    }
}

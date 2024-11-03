const express = require("express");
const app = express();
const cors = require('cors');
const ApiError = require("./app/api-error");
const userRouter=require("./app/routes/user.route");
const productRouter = require('./app/routes/product.route.js')
const cartRouter = require('./app/routes/cart.route.js')



app.use(cors());
app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to contact book aplication." });
});
app.use((req,res,next) =>{
    return next(new ApiError(404,"Resource not found"));
});

app.use((error,req,res,next)=>{
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});


module.exports = app;

const Product = require("../models/Product")


const getAllProducts = async () => {
    console.log("getAllProducts");


    const products =await Product.find({})
    return(products)

}

module.exports={
    getAllProducts,
}
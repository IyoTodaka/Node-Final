const {getAllProducts} =require("../middleware/shop.service")

const testController = async (req,res,next)=>{
    const jsonData = {id:"test",msg:"hello"}
    return res.json(jsonData)
}
const getAllProductsController = async(req,res,next)=>{
    const allProducts = await getAllProducts()
    console.log("getAllProductsController");
    console.log(allProducts);

    return res.json(allProducts)

}
module.exports={
    testController,
    getAllProductsController
}

const router = require("express").Router();
const {
    registeUserController,
    loginController,
}=require("../controller/auth.controller")
const {getAllProductsController}=require("../controller/shop.controller")

router.get("/products",getAllProductsController)
router.post("/users",registeUserController)
router.post("/login",loginController)


module.exports = router
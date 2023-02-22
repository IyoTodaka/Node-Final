const {signUp,login} =require("../middleware/auth.service")

const testController = async (req,res,next)=>{
    const jsonData = {id:"test",msg:"hello"}
    return res.json(jsonData)
}
const registeUserController = async(req,res,next)=>{
    const registeUserService = await signUp(req.body)
    return res.json(registeUserService)

}
const loginController = async(req,res,next)=>{
    const loginService = await login(req.body)
    console.log("loginController");
    console.log(loginService);

    return res.json(loginService)

}
module.exports={
    testController,
    registeUserController,
    loginController
}

const User = require("../models/User")
const Token = require("../models/Token")
const crypto = require("crypto");
const JWT = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const {jwtSecret, salt} = require("../config")


const signUp = async (data) => {
    console.log("signUP実行中");
    console.log(data)

    
    data.id=crypto.randomUUID()

    const user = new User(data)

    // generate a JWT token
    const token = JWT.sign({ id: user.id }, jwtSecret)
    try {
        await user.save()
    } catch (error) {
        console.log(error);        
    }
    data = {...data, "token":token}
    console.log("saved?");
    return(data)
}

const login = async (data) => {
    console.log("login実行中");
    console.log(data);
    const { email,password } = data
    let user = await User.findOne({ email })
    console.log(user);
    if(!user){
        const error = new Error("User does not exists. Please try again")
        error.status = 401
        throw error
    }
    console.log(data.password);
    
    const isValid = await bcrypt.compare(password, user.password)
    console.log(isValid);
    const token = JWT.sign({ id: user._id}, jwtSecret)
        
    

    if(isValid){
        return (data = {
            userId: user.id,
            email: user.email,
            name: user.name,
            token
        })
    }else{
        throw new Error("Incorrect credentials")
    }
}

module.exports={
    signUp,
    login
}
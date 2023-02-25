//スキーマを定義するためにmongoose(mongoose.Schema関数を使う)をインポートする
const mongoose = require("mongoose"); 
const bcrypt = require('bcryptjs')
const {jwtSecret, salt} = require("../config")

//スキーマ(データの定義)をJSON形式で定義する
const userSchema = new mongoose.Schema({
    id:{
        type: String,
        //requiredは必須flag、trueにすると必須項目になる
        required:true,
        //前後のスペースを削除する
        trim: true,
        maxlength:40,
    },
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
})
userSchema.pre("save", async function(next){
    console.log("pre save");
    console.log(!this.isModified("password"));
    console.log("if抜けた");
    console.log(salt);
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
})


//この定義を他でも使いたい(server.jsでも使いたい)のでThreadという名前でexportする
module.exports = mongoose.model("User" , userSchema);
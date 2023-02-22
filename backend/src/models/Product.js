//スキーマを定義するためにmongoose(mongoose.Schema関数を使う)をインポートする
const mongoose = require("mongoose"); 
const bcrypt = require('bcryptjs')
const {jwtSecret, salt} = require("../config")

//スキーマ(データの定義)をJSON形式で定義する
const productSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    img:{
        type: String,
        required: true,
    },
    detail:{
        type: String,
        required: true,
    },
    stripe:{
        type: String,
        required: true,
    },
})

//この定義を他でも使いたい(server.jsでも使いたい)のでThreadという名前でexportする
module.exports = mongoose.model("Product" , productSchema);
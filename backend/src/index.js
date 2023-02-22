require('dotenv').config()
require('express-async-errors')
require('./utils/db')

const express=require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const router = require("express").Router();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}))

// This is your test secret API key.
const stripe = require('stripe')('sk_test_51MdyZWFEC4VxYRxZLrP6itkBCX9bdIpX23l2ae0tCP9UYm4CEnXC0jWnLFWfhkDvyu4Qd9zdELj5cNIVvpOLa3iQ00oJ43j8in');
app.use(express.static('public'));

app.post('/create-checkout-session', async (req, res) => {
    let itemList=[]
    req.body.map((item)=>{itemList.push({price:item.stripe, quantity:item.count})})
    console.log("test");
    const session = await stripe.checkout.sessions.create({
      line_items:itemList,
      mode: 'payment',
      success_url: `http://localhost:5173?success=true`,
      cancel_url: `http://localhost:5173?canceled=true`,
    });
    // res.redirect(303, session.url);
    res.json(session)
    
  });
  

// /checkにrequestが飛んできたら"Health check"の文字列を返す。サーバーの健康状態をcheckするため
app.use('/check',(_,res)=>res.json({message:"Health check"}))
// /apiにrequestが飛んで来たら./routesを見に行く
app.use('/api',require('./routes'))


// 定義していない想定外のパスにrequestが飛んで来たら404を返す
app.use((req,res,next) => {
    const err = new Error("Route not found")
    err.status = 404
    next(err)
})

//catch all middleware/route　例外処理
app.use((error, req,res,next) => {
    res.status(error.status || 500).json({ error: error.message })
})

app.listen(port, () => console.log(`Server is running on Port ${port}`))
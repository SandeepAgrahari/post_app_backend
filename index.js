const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const connectDB = require('./database/connection')

const postRouter = require('./routes/posts')

const app = express()

app.use(cors())

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.use('/posts',postRouter)

app.get('/',(req,res)=>{
    res.send('Home page')
})

connectDB().then(()=>{
    app.listen(PORT,()=>console.log(`Server is running on port : ${PORT}`))
}).catch((err)=> console.log(err.message))
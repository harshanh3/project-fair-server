// steps to define express file
// Loads .env file contents into process .env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./controllers/database/connection')

const pfServer = express()


pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

const PORT = 3001 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`pfServer Started at port ${PORT} and waiting for client request !!!`);
    
})
pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red;"> pfServer Started at port and waiting for client request !! </h1>`)
})

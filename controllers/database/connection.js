const mongoose = require('mongoose')

const  connectionString = process.env.DBCONNECTIONSTRING 

mongoose.connect(connectionString).then(res=>{
    console.log("mongoDB Atlas connection sucessfuly with pfServer");
}).catch(err=>{
    console.log("mongoDB Atlas connection Failed");
    console.log(err);
    
    
})
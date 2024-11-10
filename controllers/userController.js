const users = require('../models/userModel')
const jwt = require('jsonwebtoken')


// register
exports.registerController= async (req, res) => {
    console.log("Inside Register controller");
    console.log(req.body);
    const { username, email, password } = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("A`lredy exsiting user... please login!!!")
        }else{
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilepik:""

            })
           await  newUser.save()
           res.status(201).json(newUser)

        }
    }catch(err){
        res.status(200).json(err)

    }
    

}

// login
exports.loginController = async (req,res)=>{
    console.log(" inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // token generation
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(201).json({user:existingUser,token})
        }else{
            res.status(404).json("incorrect Email / Password")
        }
    }catch(err){
        res.status(401).json(err)
    }  
}

// profile update

exports.editUserController = async  (req,res)=>{
    console.log("inside editUserController");
    const {username,email,password,github,linkedin,profilepik} = req.body
    const uploadProfilepik = req.file?req.file.filename:profilepik
    const  userId = req.userId
    try{
     const updatedUser = await users.findByIdAndUpdate({_id:userId},{
        username,email,password,github,linkedin,profilepik:uploadProfilepik
     },{new:true})
     await updatedUser.save()
     res.status(200).json(updatedUser)
    }catch(err){
        res.status(401).json(err)
    }

}

const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerUser(req,res){
    const {name,email,password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({message:"User Already Exists"})
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        name,
        email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        name:user.name

    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(201).json({
        message:"User registered successfully",
        token,
        user:{
             id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,

        }
    })
}

async function loginUser(req,res){


    const {name,email,password} = req.body;
    const user = await userModel.findOne({
        email
    })
    if(!user){
        res.status(201).json({
            message:"Invalid Credentials"
        })
    }

    const isPassword = await bcrypt.compare(password,user.password)
     if(!isPassword){
        res.status(201).json({
            message:"Incorrect password"
        })
    }

     const token  = jwt.sign({
        id:user._id,
           name:user.name
    },process.env.JWT_SECRET)

  res.cookie("token",token);

    res.status(200).json({
        message:"User logged in successfully ",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        }
    })

}


module.exports = {registerUser,loginUser}
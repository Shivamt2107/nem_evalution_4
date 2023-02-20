const express = require("express")


const userRouter = express.Router()

const jwt = require("jsonwebtoken")
const {userModel} =require("../model/users.model")
const bcrypt = require("bcrypt")




userRouter.post("/register",async(req,res)=>{

    const {name,email,gender,password ,age ,city } = req.body

    try {

        bcrypt.hash(password,5,async(err,hash)=>{

            if(err){
                console.log(err)
                res.send('something went wrong')
            }else{

                const user = new userModel({name,email,age,gender,city,password:hash})

                await user.save()
                res.send("user has been registered successfully")
            }
        })
        
    } catch (err) {
        console.log(err)
    }
})


userRouter.post("/login",async(req,res)=>{

    const {email,password} = req.body

    try {

        const user = await userModel.find({email:email})

        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{

                if(result){
                    const token = jwt.sign({userID:user[0]._id},"shiv")
                    res.send({"msg":"Login SuccessFully","Token":token})
                }else{
                    res.send("Wrong credential")
                }
            })
        }else{
            res.send("Wrong credential")
        }
        
    } catch (err) {
        console.log(err)
    }
})



module.exports={userRouter}
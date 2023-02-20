const express = require("express")


const postRouter = express.Router()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { postModel } = require("../model/post.model")



postRouter.get("/",async(req,res)=>{

    const Laptop = req.query.Laptop
    const Tablet = req.query.Tablet
    const Mobile = req.query.Mobile


    if(Laptop){
        try {

            let post = await postModel.find({device:Laptop})
    
            res.send(post)
            
        } catch (err) {
            console.log(err)
        }
    }else if(Tablet){

        try {

            let post = await postModel.find({device:Tablet})
            res.send(post)            
        } catch (err) {
            console.log(err)
        }

    }else if(Mobile){

        try {

            let post  = await postModel.find({device:Mobile})
            
        } catch (err) {
            console.log(err)
        }
    }else{

        try {

            let post = await postModel.find()
            res.send(post)
            
        } catch (err) {
            console.log(err)
        }
    }
    
})


postRouter.post("/create",async(req,res)=>{

    const payload = req.body

    try {

        const post_Data = new postModel(payload)
        await post_Data.save()
        res.send("Data has been added in database")
        
    } catch (err) {
        console.log(err)
    }
})


postRouter.patch("/update/:id",async(req,res)=>{

    const Id = req.params.id
    const payload = req.body

    const sPost= await postModel.find({"_id":Id})
    const Post_Id = sPost.userID

    const making_id = req.body.userID

    try {

        if(Post_Id!==making_id){
            res.send("your not authorized")
        }else{
            await postModel.findByIdAndUpdate({_id:Id},payload)
            res.send("Date has been updated on database")
        }
        
    } catch (err) {
        console.log(err)
    }

})


postRouter.delete("/delete/:id",async(req,res)=>{

    const Id = req.params.id
    const sPost= await postModel.findOne({"_id":Id})
    const Post_Id = sPost.userID

    const making_id = req.body.userID

    try {

        if(Post_Id!==making_id){
            res.send("Your not authorized")
        }else{
            await postModel.findByIdAndDelete({_id:Id})
            res.send("data has been deleted at database")
        }
        
    } catch (err) {
        console.log(err)
    }

})


module.exports={postRouter}
const jwt = require("jsonwebtoken")

const Authenticate = (req,res,next)=>{

    const token =  req.headers.authorization

    if(token){

        jwt.verify(token,"shiv",(err,decoded)=>{

                if(decoded){
                    const userID = decoded.user_ID
                    req.body.userID =userID
                    next()
                }else{
                    res.send("Plz Login First")
                }
        })
    }else{
        res.send("Plz Login First")
    }
}





module.exports={Authenticate}

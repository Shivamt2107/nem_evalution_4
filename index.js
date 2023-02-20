const express  = require("express")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const app = express()
const cors = require("cors")
const { Authenticate } = require("./middlewares/Authentication.middlewares")
const { postRouter } = require("./routes/post.route")

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})




app.use("/user",userRouter)

app.use(Authenticate)
app.use("/post",postRouter)



app.listen(8080,async()=>{

    try {
        await connection
        console.log("Connected to DB")
        
    } catch (err) {
        console.log("Not connected to DB")
        console.log(err)
    }
    console.log("server is running at port 8080")
})
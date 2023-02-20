const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://shivam:gote@cluster0.l8myygh.mongodb.net/linkDin_data?retryWrites=true&w=majority")

module.exports={connection}



  

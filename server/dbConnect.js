const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://abhay:banerjee@dev-cluster.jbmkpl0.mongodb.net/news-prograd' , {useUnifiedTopology:true , useNewUrlParser:true})


const connection = mongoose.connection

connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull')
})

connection.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})


module.exports = mongoose
//import library
const mongoose=require("mongoose")

//state connection string
mongoose.connect('mongodb://localhost:27017/bankServer',{useNewUrlParser:true})

//model(schema)creation ......(model name is must be the singular form of the collection name and first letter is always capital)

//schema means fields and vlaues

const User= mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

//export

module.exports={
    User
}
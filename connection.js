const user=require('./models/user')
const mongoose=require('mongoose')
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/shoppingCard',
{useCreateIndex:true,useUnifiedTopology: true , useNewUrlParser: true})
.then(()=>{
const users=new user({
    name:"akshay maity",
    email:"akshay.maity76@gmail.com",
    cart:[]
})
users.save();

    console.log('conneted sucessfully')
}).catch(()=>{
    console.log('not conneted')
})

module.exports={mongoose}
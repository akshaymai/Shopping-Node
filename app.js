const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const User=require('./models/user')

app.use((req,res,next)=>{

    User.findById('5e78d9294823b926f0adbefd').then((usr)=>{
    
        req.user=usr;
        next()
    }).catch((rr)=>{
        console.log(rr)
    })
    })
    

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

 
app.listen(3000,()=>{
    console.log('running')
});

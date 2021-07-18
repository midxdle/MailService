const express = require('express');
const passport = require('passport');
require("./config/passport")(passport);
const session = require('express-session');
const flash = require('connect-flash');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts')
//mongoose
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));
//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));
    app.use(passport.initialize());
    app.use(passport.session());
   //use flash
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })
//Routes
app.use('/',require('./index'));
app.use('/users',require('./users'));

app.listen(3000);
const express = require('express');
const {ensureAuthenticated} = require("./config/auth.js")
const router  = express.Router();
//login page
router.get('/', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})
//dashboard page
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{
        user: req.user
        });
    })

module.exports = router;
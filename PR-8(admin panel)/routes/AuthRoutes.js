const express = require('express');

const routes = express.Router();

const {  registerPage, 
    registerUser , 
    loginUser , 
    loginPage, 
    dashboardPage, 
    logoutUser , 
    forgotPassword, 
    otpPage, 
    postOtp, 
    newpass, 
    postNewpassword,
     profileChange,
    profilePage, 
    changePassword,
    postChangepassword} = require('../controller/AuthController');

const passport = require('passport');



routes.get('/',loginPage)
routes.get('/register',registerPage)
routes.post('/registeruser',registerUser);
routes.post('/loginuser',passport.authenticate('local',{failureRedirect:'/'}),loginUser)
routes.get('/dashboard',passport.checkUser,dashboardPage);
routes.get('/logoutuser',logoutUser);

//forgot password
routes.post('/forgotpassword',forgotPassword);
routes.get('/otp',otpPage);
routes.post('/postotp',postOtp);
routes.get('/newpass',newpass);
routes.post('/postnewpassword',postNewpassword);
routes.get('/profile',profilePage);
routes.post('/profileChange',profileChange)

// password change
routes.get('/changepassword',changePassword)
routes.post('/postChangepassword',postChangepassword)

module.exports = routes;
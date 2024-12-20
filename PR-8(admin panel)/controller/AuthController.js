const nodemailer = require('nodemailer');
const UserModel = require('../models/UserModel');
const loginPage = (req,res) => {
    if(res.locals.user){
        return res.redirect('/dashboard');
    }
    return res.render('login')
}
const registerPage = (req,res) => {
    return res.render('register')
}
const registerUser = async(req,res) => {
    try{
        const {name,email,password,cpassword} = req.body

        if(password != cpassword){
            console.log(`password and confiram password not match`);
            return res.redirect('/register')
        }

        let user = await UserModel.create({
            name : name,
            email : email,
            password : password
        })
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return false;
    }
    
}
const loginUser = (req,res) =>{
    return res.redirect('/dashboard')
}
const dashboardPage = (req,res) => {
    return res.render('dashboard')
}
const logoutUser = (req,res) => {
    req.logout((err)=>{
        console.log(err);
        return false;
    })
    return res.redirect('/')
}   

const forgotPassword = async(req,res) => {
    try{
        let useremail = req.body.useremail;
    const user = await UserModel.findOne({email : useremail});
    
    if(!user){
        console.log("User not found");
        return res.redirect('/')
    }
    const otp = Math.floor(Math.random()*100000);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'meetvadodariya9825@gmail.com',
          pass: 'hfdi ihdu khhz qsca'
        }
      });
      
      var mailOptions = {
        from: 'meetvadodariya9825@gmail.com',
        to: useremail,
        subject: 'Sending Email using Node.js',
        html: `
                <h1>Forgot password</h1>
                <h2>Company name :- Meet infotech</h2>
                <h3 style="color:green">Hello ${user.name} Your Otp :- ${otp}</h3>
                <h3>Thank you</h3>

             `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          let obj = {
            otp : otp,
            email : useremail
          }
          res.cookie('otp',obj);
        return res.redirect('/otp');
        }
      });

    }catch(err){
        console.log(err);
        return false;
    }
}
const otpPage = (req,res) => {
    if(!req.cookies['otp']){
        return res.redirect('/')
    }
    return res.render('otp');
}
const postOtp = async(req,res) => {
    try{
        let otp = req.body.otp;
        let userotp = req.cookies.otp.otp;
        if(userotp==otp){
            return res.redirect('/newpass')
        }else{
            console.log(`Otp is not valid`);
            return res.redirect('/otp')   
        }
        
    }catch(err){
        console.log(err);
        return false;
    }
}
const newpass = (req,res) => {
    try{

        if(!req.cookies['otp']){
            return res.redirect('/')
        }
            return res.render('newpassword')   
     
    }catch(err){
        console.log(err);
        return false;
    }
}
const postNewpassword = async(req,res) => {
    try{
        const {newpass, conpass} = req.body
        if(newpass==conpass){
            const useremail = req.cookies.otp.email;
           await UserModel.findOneAndUpdate({email:useremail},{
            password : newpass
           })
           console.log("password successfully changed!");
           res.clearCookie('otp');
            return res.redirect('/');
        }else{
            console.log("confirm password and new password not match");
            return res.redirect('/newpass')
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const profilePage = (req, res) => {
    try {
        return res.render('profile');
    } catch (error) {
        console.log(error);
        return false;
    }
};

const profileChange = async (req,res) =>{
    try {
        const {editprofile,name,password} = req.body;
        await UserModel.findOneAndUpdate({email:editprofile},{
            name :name,
            password:password,
    })
    console.log("profile succesfully changed");

    return res.redirect('/dashboard')
        
    } catch (err) {
        console.log(err);
        return false;
    }
}

const changePassword = async(req,res)=>{
    try {
      return res.render('changePassword')
    } catch (err) {
      console.log(err);
      return false;
    }
}

const postChangepassword = async(req,res)=>{
  try {
      let email = res.locals.user.email;

      let user = await UserModel.findOne({email:email});
      const useroldpassword = user.password;

      const {oldpassword,newpassword} = req.body;

      if (oldpassword == useroldpassword) {
          await UserModel.findOneAndUpdate({email:email},{
              password: newpassword
          })
          console.log("password changed!!!...");
          
          return res.redirect('/dashboard');
      } else {
          console.log(`old password and newpassword are not match`);
          return res.redirect('/dashboard')
          
      }
  } catch (err) {
      console.log(err);
      return false;
  }
}

module.exports = {
    loginPage,registerPage,registerUser,loginUser,dashboardPage,logoutUser,forgotPassword,otpPage,postOtp,newpass,postNewpassword,profileChange, profilePage,changePassword,postChangepassword
}
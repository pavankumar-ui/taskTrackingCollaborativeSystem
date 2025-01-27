const  express = require('express');
const authRoutes = express.Router();
const validateJWT = require("../Middlewares/validateJWT");
const {validateSignup,
       validateSignin} = require("../Middlewares/Validate");
const {Signup,Signin,getProfileData,modifyProfileData,logout} = require("../Controllers/authController");



authRoutes.post("/register",validateSignup,Signup);
authRoutes.post("/login",validateSignin,Signin);

authRoutes.use(validateJWT);



//profile based routes --for managing user profile data//
authRoutes.get("/userprofile",getProfileData);
authRoutes.put("/userprofile",modifyProfileData);
//logout route//
authRoutes.post("/logout",logout);

module.exports = authRoutes;

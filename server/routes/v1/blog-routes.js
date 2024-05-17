import express from 'express'
import { uploadImage } from '../../controllers/blog-controllers';

// middlewares
// import {Auth , checkUser} from '../../middlewares/checkUserExits.js'

const router = express.Router();


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// // Route for user login
router.post("/upoloadimage", (req,res)=>{
    console.log("effefe")
})

// // Route for user signup
// router.post('/signup' , SingUp);

// // Route for sending OTP to the user's email

// router.post("/sendotp", sendOTP)
 
// // Route for Changing the password
// router.post("/changepassword",auth , changePassword)


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// // Route for generating a reset password token
// router.post("/reset-password-token", resetPasswordToken)

// // Route for resetting user's password after verification
// router.post("/reset-password", resetPassword)

export default router
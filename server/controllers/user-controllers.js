import { StatusCodes } from "http-status-codes";
import User from "../Schema/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// imports
import errorResponse from "../utils/error-response.js";
import successResponse from "../utils/success-response.js";
import { passwordRegex } from "../utils/validationCheck.js";
import { emailRegex } from "../utils/validationCheck.js";

function generateFormateData(user) {
  let payload = {
    email: user.personal_info.email,
    username: user.personal_info.username,
    id: user._id,
  };
  let token = jwt.sign(payload, process.env.Secret_key, {
    expiresIn: "24h",
  });
  return token;
}

export const SingUp = async (req, res) => {
  try {

    // fetch data
    const { fullname, email, password } = req.body;
    console.log(fullname, email, password);

    // check email and password character validation
    // if(passwordRegex.text(password) || emailRegex.text(email)) {
    //     errorResponse.message = "input are invalid"
    //     return res.status(StatusCodes.NOT_FOUND).json({
    //         errorResponse
    //     })
    // }

    // user data validation
    if (!fullname || !email || !password) {
      errorResponse.message = "Please fill the all field";
      return res.status(StatusCodes.NOT_FOUND).json({
        errorResponse,
      });
    }

    
    // check user exit or not
    let user = await User.findOne({ 
        'personal_info.email' : email
    });

    if(user) {
        successResponse.message = "User Already Exit"
        return res.status(StatusCodes.NOT_FOUND).json({
        successResponse
      })
    }
   

    // generate the username
    let username = email.split("@")[0];

    // generate the hashPassword
    const hashPassword = await bcrypt.hash(password, 10);

    // create entry in user shema
    user = await User.create({
      personal_info: { fullname, email, password: hashPassword, username },
    });

    // calling for generate the token
    let token = generateFormateData(user);

    // Cookie work here
    const options = {
        expires: new Date(Date.now() + 3 * 34 * 60 * 1000),
        httpOnly: true,
    };
    successResponse.message = "User successfully Sign Up";
    successResponse.data = { user, token };
    return res
      .cookie("token", token, options)
      .status(StatusCodes.OK)
      .json({ successResponse });
  } catch (error) {
    errorResponse.error = error;
    errorResponse.message = "error generating while signup";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorResponse,
    });
  }
};

export const Login = async (req, res) => {
  try {
    // fetch data
    let token;
    const { email, password } = req.body;
    console.log(email, password);

    // user data validation
    if (!email || !password) {
      errorResponse.message = "Please fill the all field";
      return res.status(StatusCodes.NOT_FOUND).json({
        errorResponse,
      });
    }

    // Check user exit or not
    let user = await User.findOne({
      "personal_info.email": email,
    });

    // User already present or not
    if (!user) {
      successResponse.message = "User Not found Please Signup";
      return res.status(StatusCodes.OK).json({
        successResponse,
      });
    }
    if (await bcrypt.compare(password, user.personal_info.password)) {
       token = generateFormateData(user);
    }else {
      errorResponse.message = "Password is not match";
      return res.status(StatusCodes.NOT_FOUND).json({
      errorResponse,
      });
    }

    // Cookie work here
    const options = {
        expires: new Date(Date.now() + 3 * 34 * 60 * 1000),
        httpOnly: true,
    };
    successResponse.message = "User successfully Logged";
    successResponse.data = { user, token };
    return res
      .cookie("token", token, options)
      .status(StatusCodes.OK)
      .json({ successResponse });
  } catch (error) {
    errorResponse.error = error;
    errorResponse.message = "error generating while Login process";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorResponse,
    });
  }
};

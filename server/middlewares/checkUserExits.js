import User from "../Schema/User.js";
import errorResponse from '../utils/error-response.js'
import successResponse from '../utils/success-response.js'
import StatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

export const Auth = async(req,res,next) => {
 
    try {
    console.log(req.body)
    // const authHeader =  req.headers("Authorization").replace("Bearer", "");
    const token = req.body.currentUserToken

    //if token not present give response
    console.log("token ",token)
    if (!token) {
      errorResponse.message = "Token is missing";
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errorResponse });
    }

    // verify the token if present the token
    try {
        const decode = jwt.verify(token, process.env.Secret_key);
        console.log("ff2ff")
        console.log("req.user obbject ==>",decode);
        req.user = decode;
      } catch (error) {
        errorResponse.message = "Token is invalid ! Please login Again";
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ errorResponse });
      }

    } catch (error) {
        errorResponse.message = "Something went wrong while check authentication of token";
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errorResponse });
    }

    next()

}


export const checkUser = async () => {
    try {
        const email = req.user.email

        let user = await User.findOne({ 
            'personal_info.email' : email
        });

        successResponse.data = user
        successResponse.message = "User Already Exit"
        return res.status(StatusCodes.OK).json({
            successResponse
        })


    } catch (error) {
       errorResponse.message = "Something went wrong while check authentication of exit user ot nor on Database";
       return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errorResponse });
    }
}
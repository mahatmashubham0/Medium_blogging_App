import User from "../Schema/User.js";
import errorResponse from '../utils/error-response.js'
import successResponse from '../utils/success-response.js'
import StatusCodes from 'http-status-codes'

export const Auth = async() => {
 
    try {
        const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");

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
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("req.user obbject ==>",decode);
        req.user = decode;
      } catch (error) {
        errorResponse.message = "Token is invalid ! Please login Again";
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ errorResponse });
      }
      next()
    } catch (error) {
        errorResponse.message = "Something went wrong while check authentication of token";
        return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ errorResponse });
    }

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
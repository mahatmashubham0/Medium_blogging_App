import cloudinary from 'cloudinary';
import Blog from '../Schema/Blog.js';
import BlogImage from '../Schema/BlogImage.js';
import errorResponse from '../utils/error-response.js';
import successResponse from '../utils/success-response.js'
import StatusCodes from 'http-status-codes'
import {nanoid} from 'nanoid'
import User from '../Schema/User.js';

cloudinary.config({
  cloud_name: "dx4cjscer",
  api_key: "931633484229372",
  api_secret: "wEGodEWBK0GWDKkGn63IDVpc9tI",
});

export const uploadImage = async(req,res) => {
  
    try {
      
    const photo = req.files.bannerImage;
    let url = null
    console.log("images",photo);
    const options = {
      folder: "imageCollection",
      options : 1000,
      options : 1000,
      resource_type : "auto"
     }

    url = await cloudinary.uploader.upload(
    photo.tempFilePath,
    options,
   )

   console.log("secure_url",url)

   let userBlogImage = await BlogImage.create({
    blogImage: url.secure_url,
  });

   console.log("==>",userBlogImage)

   successResponse.message = "User successfully upoload images";
   successResponse.data = { userBlogImage };
   return res
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


export const createBlog = async(req,res) => {
  try {
  
    const {title , des , banner , tags , content } = req.body;

    if(!title || !des || !banner || !tags || !content) {
      errorResponse.message = "Please fill the all field";
      return res.status(StatusCodes.NOT_FOUND).json({
        errorResponse,
      });
    }

    const blog_id = nanoid();

    console.log("blog_id ==>",blog_id,req.user.id)

    // create the entry for blog in db
    let blog = await Blog.create({
      title , des , banner , content , tags , blog_id , author: req.user.id, draft: false
    })

    console.log("blog data ==>", blog)

      User.findOneAndUpdate({_id: req.user.id}, { $inc: {"account_info.total_posts": 1} , $push: {
        "blogs": blog._id
      }})

      successResponse.message = "Blog created Successfully";
       successResponse.data = { blog };
      return res
      .status(StatusCodes.CREATED)
      .json({ successResponse });

  } catch (error) {
    errorResponse.error = error;
    errorResponse.message = "error generating while creating blog";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorResponse,
    });
  }
}

export const fetchAllBlogs = async(req,res) => {
  try {
   
    console.log("or u",Blog);
    const blogs = await Blog.find();

      successResponse.message = "All blog fetch Successfully";
      successResponse.data = { blogs };
      return res
      .status(StatusCodes.OK)
      .json({ successResponse });

  } catch (error) {
    console.log(error)
    errorResponse.error = error;
    errorResponse.message = "error generating while fetching blog";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorResponse,
    });
  }
}

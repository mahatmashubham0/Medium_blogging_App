# Fullstack MERN Blogging Website

Fork this repo of "MERN Blogging Website" to start following the video tutorial.

Checkout website demo - [Demo](https://youtu.be/J7BGuuuvDDk)

![Thumbnail](https://c10.patreonusercontent.com/4/patreon-media/p/post/90122909/dd5363bd03fb4a6c8fcd5d15df98e6bf/eyJ3Ijo4MjB9/1.png?token-time=1697414400&token-hash=BZ-Mzp19WnBLcCFB8LmJFDw98mpnCRGcOCt_T615miY%3D)

This website features include -
1. Modern Blog Editor using Editor JS.
2. Google Authentication for Users
3. Dynamic Blog Pages on dynamic urls.
4. Search Page for Searching Blogs & users.
5. Dedicated Users Profile with thier social links and written blogs.
6. Dedicated dashboard to manage blogs either published or draft.
7. Blog Post Analytics, editable and deletable.
8. Like interaction on Blogs with feature to comment on the blog.
9. Reply to comments. ( A nested Comment System )
10. Every interaction on site stores as a notification for their respective users.
11. Recent notification highlight separating them from old notifications.
12. Edit profile option to update social links, bio and username
13. Also user can change login password from settings.
14. Its mobile responsive with modern design + fade in animation on pages.
And much more.


how to add image in cloudynary
frontend code : 
 const handleUploadImage = async (e) => {
         const file = e.target.files[0]
         let formData;
         if (file) {
          formData = new FormData()
          formData.append("bannerImage", file)
       }

    try {
      const result =await apiConnector("POST", auth.image_api , formData);
      console.log("Photo Uploaded successfully", result);
      console.log(result?.data?.successResponse?.data);
      toast.success("Image Uploaded")
      toast.success(result?.data?.successResponse?.data?.user?.
        personal_info?.fullname
      )
    } catch (error) {
      console.log("error",error.AxiosError);
      console.log("==>",error);
      toast.error(error?.response?.data?.errorResponse?.message)
      console.log("Cloud not login the User Profile");
    }

  }
--------------------------------------------------------------------
  backend code : 
  export const uploadImage = async(req,res) => {
  
    console.log("fefefeffeevf")
    const photo = req.files.bannerImage;
    console.log("images",photo);
    const options = {
      folder: "imageCollection",
      options : 1000,
      options : 1000,
      resource_type : "auto"
     }

    cloudinary.uploader.upload(
    photo.tempFilePath,
    options,
    function (error, result) {
      console.log(result);
    }
  );

};

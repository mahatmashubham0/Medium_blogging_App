import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: "dx4cjscer",
  api_key: "931633484229372",
  api_secret: "wEGodEWBK0GWDKkGn63IDVpc9tI",
});

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




const fileUpload = require('express-fileupload')
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dx4cjscer', 
  api_key: '931633484229372', 
  api_secret: 'wEGodEWBK0GWDKkGn63IDVpc9tI' 
});

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });

app.user(fileUpload({
    useTempFiles: true
}))
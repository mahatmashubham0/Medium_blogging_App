import express from 'express'
import dotenv from 'dotenv'

// Import files
import connectOfDatabase from './database/databaseConnection.js'
import apiRoutes from './routes/index.js'

// done for config configuration
dotenv.config();

const app = express();

app.use(express.json());

// connectivity of DB
connectOfDatabase();

app.use('/api', apiRoutes)

// basic route for testing
app.get('/', (req,res)=>{
  res.send("Done")
})

app.listen(process.env.PORT , ()=>{
  console.log("Server Is running Successfully on Port", process.env.PORT)
})



// const fileUpload = require('express-fileupload')
// import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'dx4cjscer', 
//   api_key: '931633484229372', 
//   api_secret: 'wEGodEWBK0GWDKkGn63IDVpc9tI' 
// });

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

// app.user(fileUpload({
//     useTempFiles: true
// }))
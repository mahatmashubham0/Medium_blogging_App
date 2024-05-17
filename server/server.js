import express from 'express'
import dotenv from 'dotenv'
import cookieParser  from 'cookie-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'


// Import files
import connectOfDatabase from './database/databaseConnection.js'
import apiRoutes from './routes/index.js'

// done for config configuration
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

// Cors Connection
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

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



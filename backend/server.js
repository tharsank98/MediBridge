import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';


//app Config 
const app = express()
const port =process.env.PORT || 4001
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoint

app.use('/api/admin',adminRouter)
//localhost :4000/api/admin`

app.get('/',(req,res)=>{
   res.send('API is Working great ssss')
})

app.listen(port,()=>{
    console.log("Server stated", port)
})
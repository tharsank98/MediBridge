import 'dotenv/config' // Load environment variables
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongoDb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRouter.js'


// Initialize database and Cloudinary connections
connectDB();
connectCloudinary()

// App configuration
const app = express();
const port = process.env.PORT || 4001

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// API endpoints
app.use('/api/admin', adminRouter) // Admin routes
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)


// Root endpoint
app.get('/', (req, res) => {
    res.send('API is working great!')
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
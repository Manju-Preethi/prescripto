import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
//app config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()
//middlewares
app.use(express.json())
const allowedOrigins = [
  "https://prescripto-frontend-iuq8.onrender.com",
  "https://prescripto-admin-s4nn.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


//api end points
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    res.send("API WORKING")
})


app.listen(port,()=>console.log('Server started at PORT:',port))

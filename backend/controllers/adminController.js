import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import docterModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"


//API for adding doctor

const addDoctor = async(req,res)=>{
    try{
      const{name, email, password, speciality, degree,experience, about , fees , address} = req.body
      const imageFile = req.file

      //checking for all data add doctor 
      if(!name|| !email || !password || !speciality || !degree  || !experience|| !about || !fees || !address){
        const missingFields = [];

if (!name) missingFields.push("name");
if (!email) missingFields.push("email");
if (!password) missingFields.push("password");
if (!speciality) missingFields.push("speciality");
if (!degree) missingFields.push("degree");
if (!experience) missingFields.push("experience");
if (!about) missingFields.push("about");
if (!fees) missingFields.push("fees");
if (!address) missingFields.push("address");

if (missingFields.length > 0) {
    return res.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`
    });
}

      }

      //validating email format
      if(!validator.isEmail(email)){
        return res.json({success:false,message : "Please entered a valid email"})
      }

      //validating password format
      if(password.length<8){
        return res.json({success:false,message : "Please enter a strong password"})
      }

      //hashing doctor password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)

      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
      const imageUrl = imageUpload.secure_url

      const doctorData ={
        name,
        email,
        image:imageUrl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()

      }

      const newDoctor = new docterModel(doctorData)
      await newDoctor.save()
      res.json({success:true,message:"Doctor Added"})

    }catch(error){
      console.log(error)
      res.json({success:false,message:error.message})
    }
}

//API for the admin login
const loginAdmin = async(req,res) =>{
   try{

    const {email,password} = req.body

    if(email=== process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
         const token = jwt.sign(email+password,process.env.JWT_SECRET)
         res.json({success:true,token })
    }else{
        res.json({success:false, message:"Invalid credentials"})
    }

   }catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
   }
}

export {addDoctor,loginAdmin}
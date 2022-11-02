const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
 
   name:{
      type:String,
      required:true,
   },
   gender:{
      type:String,
      required:true,
      enum:["Male", "Female", "Others"]
   },
   role:{
      type:String,
      required:true,
      enum:["User", "Admin"]
   },
   isAdmin:{
      type:Boolean,
      default:false
   },
   phone:{
      type:String,
      required:true,
      unique:true
   },
   email:{
      type:String,
      required:true,
      unique:true,
   },
   password:{
      type:String,
      required:true,
      minLength:8,
      maxLength:15
   },
},{timestamps:true});

module.exports = mongoose.model("myuser",userSchema)

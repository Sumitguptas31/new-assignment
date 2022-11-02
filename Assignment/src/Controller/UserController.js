const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");


const isValid = function(value){
    if(typeof value === "undefined" || value === null) return false
    if(typeof value === "string" && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const UserSignUp= async function (req, res) {
    try {
        let user = req.body;

        const {name,gender,email,phone,password,role,isAdmin} = user

        if (!isValidRequestBody(user)) {
            return res.status(400).send({ status: false, msg: "enter data in user body" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Name is required" })
        }
        if (!isValid(role)) {
            return res.status(400).send({ status: false, msg: "role is required" })
        }
        if (!isValid(isAdmin)){
            return res.status(400).send({ status: false, msg: "isAdmin is required" })
        }
        if (!isValid(gender)) {
            return res.status(400).send({ status: false, msg: "gender is required" })
        }
        if (!isValid(phone)) {
            return res.status(400).send({status: false, msg: "Enter phone no." })
        }
        const isphone = await userModel.findOne({ phone })
        if (isphone) {
            return res.status(400).send({status: false, msg: "Phone no. is already used" })
        }
        if (!(/^[6-9]\d{9}$/.test(phone))) {
            return res.status(400).send({ status: false, message: `Phone number should be a valid number` })

        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "Enter email " })
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }
        const isemail = await userModel.findOne({ email })
        if (isemail) {
            return res.status(400).send({status: false, msg: "Email.  is already used" })
        }
        if (!isValid(password.trim())) {
            return res.status(400).send({status: false, msg: "Enter Password " })
        }
        if (!(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password.trim()))) {
            return res.status(400).send({status: false, msg: "password length Min.8 - Max. 15" })
        }
       
        const NewUsers = await userModel.create(user)
        return res.status(201).send({ Status: true, msg: "InternData sucessfully Created", data: NewUsers })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const UserLogin = async function (req, res) {
    try {
        let user = req.body;
        const {email,password}=user
        
        let findUser = await userModel.findOne({ email: email, password: password,isAdmin:true})
        if (!findUser) {
           return res.status(400).send({ status: false, msg: "you are unathourized" })
        } else {
            let Token = jwt.sign({
                userId: findUser._id,
            }, "mysecretkey",{expiresIn : "300m"});
           return res.status(201).send({ status: true, msg: "token Created Successfully", Token:Token })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
const getAllUser=async function(req,res){
    try{
        let data= await userModel.find()
        if(!data){
            res.status(404).send({status:true,msg:"users not found"})
        }
        return res.status(200).send({status:true,msg:"successfully get all user",data:data})

    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
const DeleteUser=async function(req,res){
    try{
        let userId=req.params.id
        let data= await userModel.remove({"_id":userId})
        if(!data){
            res.status(404).send({status:true,msg:"user not found"})
        }
        return res.status(200).send({status:true,msg:"user successfully deleted"})

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getUserById=async function(req,res){
    try{
        let userId=req.params.id
        let data= await userModel.findOne({_id:userId})
        if(!data){
            res.status(404).send({status:true,msg:"user not found"})
        }
        return res.status(200).send({status:true,msg:"user details fetched",data:data})

    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports={UserSignUp,UserLogin,getAllUser,DeleteUser,getUserById}
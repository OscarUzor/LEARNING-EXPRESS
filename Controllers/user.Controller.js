const userModel = require("../My Models/user.Model")
const kycModel = require("../My Models/kycModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// creating a user
const createUser = async (req, res) =>{
    const {password, ...others} = req.body
    // Hashing Password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
   // Checking User Existence
   const isUser = await userModel.findOne({email: others.email})
   console.log(isUser)
   if (isUser){
    return res.status(400).json({message: "User Details Already Exists"})
   }
    try{
        const newUser = new userModel({...others, password: hashedPassword})
        await newUser.save()
        res.status(201).send("USer Created Successfully")
    } catch (error) {
        res.send(error)
    }
}

const getAllUsers = async (req, res)=>{
    try{
        const Users = await userModel.find()
        res.status(200).json(Users)
    } catch (error) {
        console.log("Connection error")
    }
}


const deleteUsers = async (req, res)=>{
    const {id} = req.body
    try{
        await userModel.findByIdAndDelete(id)
        res.status(200).send("User account deleted successfully")
    } catch (error) {
        res.status(500).send("error deleting user account")
    }
}


const updateUsers = async (req, res)=>{
    const{id, name, age} = req.body
    try{
        await userModel.findByIdAndUpdate(id, {name, age},{new:true})
        res.status(200).send("User updated successfully")
    } catch (error) {
        res.staus(500).send("error updating user")
    }

}

// To FInd/get only one item
const getOneUser = async (req, res)=>{
    const user = req.user
    try{
        const oneUser = await userModel.findById(user).populate({path: "kyc"}).populate("posts")
        res.json(oneUser)
    } catch (error) {
        res.send("Connection error")
    }
}

// login A User
const loginUser = async (req, res)=>{
    const {email, password} = req.body
    if (!email || !password){
        return res.status(400).json({message: "Provide valid credentials"})
    }
    // Checking if user exists
    const checkUser = await userModel.findOne({email})
    if (!checkUser){
        return res.status(404).json({message: "User not found, Please Resgister"})
    }
    // Checking/COmparing user password with those within our database
    const isPasswordValid = bcrypt.compareSync(password, checkUser.password)
    console.log(isPasswordValid)
    if (!isPasswordValid){
        return res.status(400).json({message: "Password is not valid"})
    }
    // creating jwt token
    const token = jwt.sign({id:checkUser.id}, process.env.JWT_SECRET)
    //Return the user info to frontend
    return res.cookie("token", token, {httpOnly: true}).status(200).json(checkUser)
}


const userKyc = async(req, res)=>{
    const body = req.body
    const user = req.user
    try {
        //creating kyc
        const kyc = new kycModel({...body, user})
        const savedKyc = await kyc.save()
        //updating the userModel kyc field
        await userModel.findByIdAndUpdate(user, {kyc: savedKyc.id}, {new: true})
        res.send("Kyc created successfully")
    } catch (error) {
        res.send("somthing went wrong")
    }
}

const getKyc = async (req, res)=>{
    const {id} = req.params
    try {
        const oneKyc = await kycModel.findById(id).populate({path:"user", select:"name email -_id"})
        res.json(oneKyc)
    } catch (error) {
        res.send("something went wrong")
    } 
}


module.exports = {createUser, getAllUsers, deleteUsers, updateUsers, getOneUser, loginUser, userKyc, getKyc}

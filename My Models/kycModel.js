const mongoose = require("mongoose")

const kycSchema = new mongoose.Schema({
    frontPix:{
        type:String,
        require:true,
    },
    backPix:{
        type:String,
        require:true,
    },
    country:{
        type:String,
        require:true,
    },
    completed:{
        type:Boolean,
        require:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:"User",
        unique: true,
    },
}, {timestamps:true})

const kycModel = mongoose.model("kyc", kycSchema)
module.exports = kycModel
const mongoose = require("mongoose")

const user = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require:true,
    },
    age: {
        type: Number,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        require:true,
        default: false,
    },
    email: {
        type: String,
        require: true,
        unique: true 
    },
    kyc: {
        type: mongoose.Types.ObjectId,
        ref: "kyc",
    },
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post"}],
    articles: [{ type: mongoose.Types.ObjectId, ref: "Article"}]
}, {timestamps:true});

const userModel = mongoose.model("User", user)
module.exports = userModel
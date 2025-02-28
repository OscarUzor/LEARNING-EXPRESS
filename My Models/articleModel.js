const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
title:{
    type: String,
    require: true,
},
desc:{
    type: String,
    reqire: true,
},
authors:[{type: mongoose.Types.ObjectId, ref: "User"}]
}, {timestamps: true})

const articleModel = mongoose.model("Article", articleSchema)
module.exports = articleModel
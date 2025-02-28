const express = require("express")
const routes = require("./Routes/user.Route") // Routes that allows us connects to our main index app file 
const postRoutes = require("./Routes/post.routes")
const articleRoutes = require("./Routes/article.Routes")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
app.use(express.json()) // middleware that helps interpret infomations sent form frontend
app.use(cookieParser())





mongoose.connect(process.env.MONGO_URL)
.then (()=>{
    console.log("Connection Successful")
})
.catch (()=>{
    console.log("Connection error")
})



app.listen(PORT, () => {
    console.log("This app is running")
    // connectDb()
})

app.use(routes)
app.use(postRoutes)
app.use(articleRoutes)

const PORT = process.env.PORT || 5000


/*This source code is an alternative for situations where you have 
multiple secrects in your files and this helps to minimize 
the need to always go to your .env to make thiese changes 
while you can add it here in your index file*/

// const {MONGO_URL, JWT_SECRET} = process.env >

// function connectDb(){
//     try{
//         mongoose.connect("mongodb://localhost:27017/cohort7")
//         console.log("Connection Successful")
//     }catch(error){
//         console.log("Error Connecting")
//     }
// }

/*
Routes
Controller > Parts of a folder structure
Models
*/

/* for nodemon installation use the phrase 
"npm i -g nodemon" for global installation,
while foR Specific project installation we can use the 
phrase "npm i nodemon" or "npm i -D nodemon" for dev dependency
*/
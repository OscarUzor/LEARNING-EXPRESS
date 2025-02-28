const express = require("express")
const{createPost, getAllPost, getOnePost, deletePost, updatePost} = require("../Controllers/post.controller")
const authorization = require("../middlewares/authorization")
const routes = express.Router()


routes.post("/post", authorization, createPost)
routes.get("/post", getAllPost)
routes.get("/post/:id", getOnePost)
routes.delete("/post/:id", authorization, deletePost)
routes.put("/post/:id", authorization, updatePost)


module.exports = routes
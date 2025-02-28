const express = require("express")
const {createArticle, getOneArticle} = require("../Controllers/article.controller")
const authorization = require("../middlewares/authorization")
const routes = express.Router()


routes.post("/articles", authorization, createArticle)
routes.get("/articles/:id", getOneArticle)


module.exports = routes
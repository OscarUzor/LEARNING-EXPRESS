const express = require("express")
const {createUser, getAllUsers, deleteUsers, updateUsers, getOneUser, loginUser, userKyc, getKyc} = require("../Controllers/user.Controller")
const authorization = require("../middlewares/authorization")
const routes = express.Router()


// CRUD OPERATORS (CREATE, READ, UPDATE, DELETE)
routes.post("/user", createUser)
routes.get("/user", getAllUsers)
routes.delete("/user/:id", deleteUsers)
routes.put("/user", updateUsers)
routes.get("/user/single", authorization, getOneUser)
routes.post("/login", loginUser)
routes.post("/kyc", authorization, userKyc)
routes.get("/kyc/:id", getKyc)


module.exports = routes
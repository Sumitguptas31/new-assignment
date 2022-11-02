const express = require('express');
const router = express.Router();
const Controller = require("../Controller/UserController")
const Auth = require("../Middleware/Auth")

router.post("/create-user", Controller.UserSignUp);
router.post("/login-user", Controller.UserLogin)
router.get("/get-all-User",Auth.authentication,Controller.getAllUser)
 
//Extra APIs
router.get("/get-UserById/:id",Auth.authentication,Controller.getUserById)
router.delete("/delete-User/:id",Auth.authentication,Controller.DeleteUser)

module.exports = router;
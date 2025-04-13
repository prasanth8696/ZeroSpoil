const express = require("express")
const { userRegister, userLogin, verifyUserToken } = require("../controllers/userControllers")

const router = express.Router()



router.post("/register",userRegister)

router.post("/login",userLogin)

router.get("/verifyToken",verifyUserToken)

//router.put("/current",() => {})

module.exports =  router
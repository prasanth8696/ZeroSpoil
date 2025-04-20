const express = require("express");
const { getAllBusiness,
getBusinessById,
getCurrentBusiness,
businessLogin,
businessRegister,
verifyBusinessUserToken } = require("../controllers/businessControllers");
const verifyToken = require("../middleware/authentication");

router = express.Router()



router.post("/register",businessRegister);

router.post("/login", businessLogin);

router.get("/verifyToken",verifyBusinessUserToken);

//router.get("/", verifyToken, getAllBusiness);

//router.get("/current",verifyToken,getCurrentBusiness);

//router.get("/:id" ,verifyToken,getBusinessById);


module.exports = router;
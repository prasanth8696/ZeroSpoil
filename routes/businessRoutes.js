const express = require("express");
const { getAllBusiness,
getBusinessById,
getCurrentBusiness,
businessLogin,
businessRegister } = require("../controllers/businessControllers")

router = express.Router()


router.get("/", getAllBusiness);

router.post("/register", businessRegister);

router.post("/login", businessLogin);

router.get("/current",getCurrentBusiness);

router.get("/:id" ,getBusinessById);


module.exports = router;
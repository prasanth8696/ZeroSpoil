const express = require("express")
const {
    getAllTaxes,
    getTaxById,
    createTax,
    updateTaxById,
    deleteTaxById
} = require("../controllers/taxControllers")
const verifyToken = require("../middleware/authentication")

const router = express.Router()

//get all the taxes
router.get("/",verifyToken,getAllTaxes)

//get specific taxes by ID
router.get("/:id",verifyToken,getTaxById)

//create new tax
router.post("/",verifyToken,createTax)

//update the tax by ID
router.put("/:id",verifyToken,updateTaxById)

//delete the tax by ID
router.delete("/:id",verifyToken,deleteTaxById)

module.exports = router
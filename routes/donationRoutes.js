const express = require("express")
const {
    getAllDonations,
    getDonationById,
    getMyDonations,
    createDonation,
    updateDonation,
    deleteDonations
} = require("../controllers/donationControllers");
const verifyToken = require("../middleware/authentication");
const router = express.Router()

//get all the donation list
// by deafult open,inprogress records will fetch from database
//optional query parameters
// status > donationStatus
router.get("/",verifyToken,getAllDonations)

router.get("/myDonations",verifyToken,getMyDonations)

//get donation by Id
router.get("/:id",verifyToken,getDonationById)

//create Donation
router.post("/create",verifyToken,createDonation)

//update donations
router.put("/",verifyToken,updateDonation )

//delete donations
router.delete("/",verifyToken,deleteDonations)

module.exports = router

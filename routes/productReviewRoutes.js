const express = require("express")

const router = express.Router()

//get all the reiews
//optional query parameters
//  id > to get specific review
//  limit > by default 20 , we can specify upto 20(if id specified it will be ignored)
router.get("/",() => {})

//get all the reviews based on product ID
router.get("/:productId",() => {})

//create the product review once donation order is completed
router.post("/",() => {})

//update the review by ID
router.put("/:id",() => {})

//delete the review by ID
//only admin have access(need to implement ABAC)
router.delete("/:id",() => {})

module.exports = router
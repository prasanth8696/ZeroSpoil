const asyncHandler = require("express-async-handler");



const businessRegister = asyncHandler( async (req,res) => {

    const { name, password, address } = req.body;
    console.log(req.body)
    res.status(201).json({ message : "user account created successfully",name,address})
});

const businessLogin = asyncHandler( async (req,res) => {

    const {name, password} = req.body;
    console.log(req.body)

    res.status(200).json({message : `Login successfull for ${name}`})
});

const getAllBusiness =  asyncHandler(async (req, res) => {

    res.status(200).json({message : "get all grocessies from the database"})
});

const getCurrentBusiness =  asyncHandler(async (req,res) => {

    res.status(200).json({message : `get current grocery details`})
});


const getBusinessById = asyncHandler(async (req,res) => {

    console.log(req.params.id)
    res.status(200).json({message : `get grocery details by ID : ${req.params.id} `})
});



module.exports = { 
    getAllBusiness,
    getBusinessById,
    getCurrentBusiness,
    businessLogin,
    businessRegister

}
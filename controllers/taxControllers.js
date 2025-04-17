const asyncHandler = require("express-async-handler")
const taxModel = require("../models/taxModels")

//@desc get all the taxes
//@route /api/products/taxes
//@method GET
//@access private

//optional query parameters 
//  limit > by default: 20
// childTax > example childTax=true by default false
//standAlone > example standAlone=true by default false
const getAllTaxes = asyncHandler( async(req,res) => {

    const limit = req.query.limit || 20
    const standAlone = req.query.standAlone || false
    const childTax = req.query.childTax || false
    const allTaxesQuery = taxModel.find({})

    if(standAlone){
        allTaxesQuery.where("isStandAloneTax").equals(true)
    }
    if(childTax){
        allTaxesQuery.where("isChildTax").equals(true)
    }
    const allTaxes = await allTaxesQuery.limit(limit).sort("-createdAt").populate("childTaxIds")

    res.status(200).json(allTaxes)
});


//@desc get all the taxes
//@route /api/products/taxes/:id
//@method GET
//@access private
const getTaxById = asyncHandler( async (req,res) => {

    const taxId = req.params.id 

    const currentTax = await taxModel.findById(taxId).populate("childTaxIds")

    if(! currentTax){
        res.status(404)
        throw new Error("Tax Not found")
    }

    res.status(200).json(currentTax)
})


//@desc create new tax()
//@route /api/products/taxes/:id
//@method POST
//@access private
const createTax = asyncHandler( async (req,res) => {

    const { name,
            description,
            taxRate,
            cessRate,
            isStandAloneTax,
            isChildTax,
            childTaxes 
    } = req.body

    if ( ! name || ! taxRate){
        res.status(400)
        throw new Error("all fields are mandatory!")
    }

    const taxWithSameName = await taxModel.findOne({"name" : name})

    if(taxWithSameName){
        res.status(400)
        throw new Error("tax is already exists")
    }

    const currentTax = {
        name,
        description,
        taxRate,
        cessRate,
    }
    if(isStandAloneTax){
        
        currentTax.isChildTax = false

        if(childTaxes){
            currentTax.childTaxIds = childTaxes.map( (childTax) => {
                if(childTax.isChildTax){   
                    return childTax._id
                }else{
                    res.status(400)
                    throw new Error("cant add standalone tax as child tax")
                }   
            })
        }
    }
    
    if(isChildTax){

        currentTax.isStandAloneTax = false
        currentTax.isChildTax = isChildTax
    }

    let savedTax = await taxModel.create(currentTax)

    //populate the references
    savedTax = await taxModel.findById(savedTax._id).populate("childTaxIds")


    res.status(201).json(savedTax)

})

//@desc update the tax by id
//@route /api/products/taxes/:id
//@method PUT
//@access private

const updateTaxById = asyncHandler( async (req,res) => {

    const taxId = req.params.id

    let currentTax;
    currentTax = await taxModel.findById(taxId)

    if(! currentTax){
        res.status(404)
        throw new Error("Tax Not Found")
    }

    const {
        name,
        description,
        taxRate,
        cessRate,
        childTaxes,
        isChildTax,
        isStandAloneTax
    } = req.body

    currentTax.name = name || currentTax.name
    currentTax.description = description || currentTax.description
    currentTax.taxRate = taxRate || currentTax.taxRate
    currentTax.cessRate = cessRate || currentTax.cessRate
    
    if(isChildTax && isStandAloneTax){
        res.status(400)
        throw new Error("tax cannot both standalone and child tax")
    }
    if(isChildTax && childTaxes){
        res.status(400)
        throw new Error("cannot add child tax into another child tax")
    }
    if(isStandAloneTax && childTaxes){
        currentTax.childTaxIds = childTaxes.map( (childTax) => {
            if(childTax.isChildTax){
                return childTax._id
            }else{
                res.status(400)
                throw new Error("cant add standalone tax as child tax")
            }   
        })
    }
    currentTax.isStandAloneTax = isStandAloneTax
    currentTax.isChildTax = isChildTax

    currentTax = await currentTax.save()
    //populate the references
    currentTax = await taxModel.findById(currentTax._id).populate("childTaxIds")

    res.status(200).json(currentTax)

})


//@desc delete the tax by id
//@route /api/products/taxes/:id
//@method DELETE
//@access private

const deleteTaxById = asyncHandler( async (req,res) => {

    const taxId = req.params.id
    currentTax = await taxModel.findById(taxId)

    if(! currentTax){

        res.status(404)
        throw new Error("Tax not found")
    }
    await taxModel.findOneAndDelete({ _id: currentTax._id })
    res.status(200).json({message : "tax is deleted successfully"})

})

module.exports = {
    getAllTaxes,
    getTaxById,
    createTax,
    updateTaxById,
    deleteTaxById
}
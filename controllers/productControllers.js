const asyncHandler = require("express-async-handler")
const productModel = require("../models/productModel")


//@desc  get all the products
//@routes /api/products/
//@method GET
//@access private
const getAllProducts = asyncHandler( async (req,res) => {

    //based on the role need to give all the products
    const products = productModel.find()
    res.json({products})
})

//@desc get specific products
//@routes /api/products/:id
//@method GET
//@access private
const getProductById = asyncHandler( async (req,res) => {

    const productId = req.params.id
    const product = productModel.findById(productId)

    if(! product){
        res.status(404)
        throw new Error("Product Not found")
    }
    
    res.json(product)
})

//@desc create new products
//@routes /api/products
//@method POST
//@access private
const createProduct = asyncHandler( async (req,res) => {

    const { name,
            description,
            category ,
            price,
            stock,
            expiryDate,
            unit,
            productType
    } = req.body

    if ( ! name || ! price || ! stock || ! expiryDate || !unit){

        res.status(400)
        res.json({message : "all fields are mandatory"})
    }

    const taxes = req.body.taxes ? req.body.taxes : []

    //const { image } = r
    const productObj = {
        name,
        description,
        category,
        price,
        stock,
        expiryDate,
        unit,
        productType,
        defaultTaxes: taxes,
        ownerId: "67fd74c8561ebc2852dc30a5" //fornow

    }

    const product = await productModel.create(productObj)
    await product.save()
    res.status(201).json(product)

})


//@desc update the Product by ID
//@route /api/product/:id
//@method PUT
//@access private

const updateProduct = asyncHandler( async (req,res) => {

    const productId = req.params.id
    const currentProduct = await productModel.findById(productId)

    if(! currentProduct){
        res.status(404)
        throw new Error("Product Not Found")
    }

    const { name,
        description,
        category ,
        price,
        stock,
        expiryDate,
        unit,
        productType,
        image,
        defaultTaxes,
} = req.body

    currentProduct.name = name || currentProduct.name
    currentProduct.description = description || currentProduct.description
    currentProduct.category = category || currentProduct.category
    currentProduct.price = price || currentProduct.price
    currentProduct.stock = stock || currentProduct.stock
    currentProduct.expiryDate = expiryDate || currentProduct.expiryDate
    currentProduct.unit = unit || currentProduct.unit
    //if user is restarunt user then dont allow to update as grosary => need to implement
    currentProduct.productType = productType || currentProduct.productType
    //need to handle images
    currentProduct.defaultTaxes = defaultTaxes || currentProduct.defaultTaxes

    const savedProduct = await currentProduct.save()
    res.status(200).json(savedProduct)

})


//@desc delete the product by Id
//@route /api/product/:id
//@method DELETE
//@access private

const deleteProduct = asyncHandler( async(req,res) => {

    const productId = req.params.id
    const currentProduct = await productModel.findById(productId)

    if(! currentProduct){
        res.status(404)
        throw new Error("Product Not Found")
    }

    const { imageUrl } = currentProduct
    //need to delete from S3 bucket
    await productModel.deleteOne({ _id: currentProduct._id })

    res.status(204).json({message: "product deleted"})

})

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

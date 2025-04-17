const express = require("express");
const { getAllProducts,
getProductById,
createProduct,
updateProduct,
deleteProduct } = require("../controllers/productControllers");
const verifyToken = require("../middleware/authentication")
const taxRouter = require("./taxRoutes")

const router =  express.Router()
router.use("/taxes",taxRouter)


router.get("/",verifyToken,getAllProducts)

router.get("/:id",verifyToken,getProductById)

router.post("/",verifyToken,createProduct)

router.put("/:id",verifyToken,updateProduct)

router.delete("/:id",verifyToken,deleteProduct)

module.exports =  router
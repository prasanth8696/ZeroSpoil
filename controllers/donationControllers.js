const asyncHandler = require("express-async-handler");
const donationModel = require("../models/donation/donationModel");
const productModel = require("../models/productModel");
const taxModel = require("../models/taxModels");
const donationLineModel = require("../models/donation/donationLineModel")
const donationOrderModel = require("../models/donation/donationOrderModel");

//----------------------------------------------------helper functions-----------------------------------------------------------------
const calculateTaxAmt =  (taxes,finalDiscountedAmt) => {
    let totalTaxAmt = 0;

    for (let tax of taxes){
        let totalAmt = 0;
        if( tax.isStandAloneTax && tax.childTaxIds){
            totalAmt += calculateTaxAmt(tax.childTaxIds,finalDiscountedAmt);
        }
        else if(tax.isStandAloneTax){

            totalAmt += finalDiscountedAmt * tax.taxRate/100;
        }else{
            //current tax is child tax
            totalAmt += finalDiscountedAmt * tax.taxRate/100;
        }
        
        //calculate cess amt if it is present
        if(tax.cessRate > 0 ){
            totalAmt += totalAmt * tax.cessRate/100;
        }

        totalTaxAmt += totalAmt;
    }

    return totalTaxAmt
}

const createDonationLines = async (req,res,next,donationLines) => {

    //define default variables
    let totalDonationQuantity = 0
    let totalOrginalAmt = 0
    let totalDiscountAmt = 0
    let totalTaxAmt = 0
    let totalFinalAmt = 0
    let freeProductCount = 0
    const donationLinesList = []

    for (let donationLine of donationLines){

            try{
                let currentDonationLine = {
                    productId: "",
                    totalQuantity: 0,
                    completedQuantity: 0,
                    taxIds: [],
                    discount: 0,
                    originalAmt: 0,
                    discountAmt: 0,
                    totalTaxAmt: 0,
                    finalAmt: 0,
                    isFree: false,
                    orderIds: [],
                    donationId: ""
                };
                
                let {
                    productId,
                    totalQuantity,
                    discount,
                    originalAmt,
                    taxIds,
                    expiryDate,

                } = donationLine

                console.log(taxIds)

                if ( ! totalQuantity || ! originalAmt || !expiryDate){

                    res.status(400);
                    throw new Error("All fields are mandatory!");
                }
                expiryDate = expiryDate instanceof Date ? expiryDate : new Date(expiryDate)
                if(expiryDate.getTime() <= (new Date()).getTime() ){

                    res.status(400);
                    throw new Error("Invalid expire date");
                }

                const product = await productModel.findOne({_id : productId, ownerId: req.user._id})
                if(! product){

                    res.status(404);
                    throw new Error("product not found");
                }

                if( totalQuantity > product.stock){
                    res.status(400);
                    throw new Error("donation Qty should not greater than product Qty");
                }
                //reduce the qty in product
                product.stock = product.stock - totalQuantity;
                totalDonationQuantity += totalQuantity;
                totalOrginalAmt += originalAmt;

                //add default values
                currentDonationLine.productId = product._id;
                currentDonationLine.totalQuantity = totalQuantity;
                currentDonationLine.discount = discount;
                currentDonationLine.originalAmt = originalAmt;
                currentDonationLine.expiryDate = expiryDate

                //calculate discount Amt based on the original Price 
                const discountAmt = originalAmt * discount/100;
                const  finalDiscountedAmt = (originalAmt - discountAmt) * totalQuantity;
                currentDonationLine.discountAmt = discountAmt;
                totalDiscountAmt += discountAmt;
                //if user creating donation for free then they should enter discount 100
                //if 100 percent discount then no GST or tax will be applicable as pe the indian tax law
                if(discount == 100 || finalDiscountedAmt == 0 ){

                    currentDonationLine.taxIds = [];
                    currentDonationLine.totalTaxAmt = 0;
                    currentDonationLine.finalAmt = finalDiscountedAmt;
                    currentDonationLine.isFree = true;
                    freeProductCount++;
                }else{
                    //if taxIds is not array type and convert it to Array 
                    if( ! (taxIds instanceof Array) ){
                        taxIds = [taxIds]
                    }

                    const taxList = await taxModel.find().where("_id").in(taxIds).populate("childTaxIds")
                    currentDonationLine.taxIds = taxIds;
                    currentDonationLine.totalTaxAmt = calculateTaxAmt(taxList,finalDiscountedAmt);
                    currentDonationLine.finalAmt = finalDiscountedAmt + currentDonationLine.totalTaxAmt;
                }

                totalTaxAmt += currentDonationLine.totalTaxAmt;
                totalFinalAmt += currentDonationLine.finalAmt;
                await product.save();
                donationLinesList.push(currentDonationLine);

            }catch(err){

                next(err)
            }

        }
        return {
            donationLinesList,
            totalDonationQuantity,
            totalOrginalAmt,
            totalDiscountAmt,
            totalTaxAmt,
            totalFinalAmt,
            freeProductCount
        }
}

//--------------------------------------------------------------------------------------------------------------------------------


//@desc get all the donation list by default it will fetch only open and in progress donations
//@route /api/donations
//@method GET
//access private
//optinal parameters
// status > option=> Open(default),InProgress(default),Completed,Cancelled
// limit  > by default 20
//page    > default 1 need to implement

const getAllDonations = asyncHandler( async (req,res) => {

    const limit = req.query.limit || 20 ;
    let donationStatusArr = ["Open","InProgress"];
    donationStatusArr = req.query.status ?  donationStatusArr.concat(req.query.status) : ["Open","InProgress"];

    const donationQuery = donationModel.find()
        .where("donationStatus")
        .in(donationStatusArr)
        .limit(limit)
        .populate("donationLineIds orderIds");

    let allDonations = await donationQuery.exec();

    res.status(200).json(allDonations);

});

//@desc get the donation record by Id
//@route /api/donations/:id
//@method GET
//access private

const getDonationById =  asyncHandler( async (req,res) => {

    const donationId = req.params.id;

    const donation = await donationModel.findById(donationId)
        .populate("donationLineIds orderIds");
    
    if(! donation){
        res.status(404);
        throw new Error("Donation Not Found");
    }

    res.status(200).json(donation);
});

//@desc get all the donations related to current user
//@route /api/donations/myDonations
//@method GET
//access private
//optional Query parameters
//limit > default 20
//page > default 1 need to implement

const getMyDonations = asyncHandler( async (req,res) => {

    const currentUser = req.user;
    const limit = req.query.limit || 20 ;

    const allDonations = await donationModel.find()
        .where("donorId")
        .equals(currentUser._id)
        .limit(limit)
        .populate("donationLineIds orderIds");

    res.status(200).json(allDonations);

});


//@desc create new Donation
//@route /api/donations/create
//@method POST
//access private

const createDonation = asyncHandler( async (req,res,next) => {
    //define default variables
    const currentDonation = {
        name: "",
        donorId: "",
        donorType: "",
        donationLineIds: [],
        totalDonationQuantity: 0,
        donatedQuantity: 0,
        wastedQuantity: 0,
        donationStatus: "Open",
        discount: 0,
        originalAmt: 0,
        discountAmt: 0,
        totalTaxAmt: 0,
        finalAmt: 0,
        isFree: false,
        expiryDate: "",
        orderIds: [],
    };
    
    const currentUser = req.user

    //if current user is business user
    if(currentUser.isBusinessUser){

        const {
            name,
            donationLineIds,

        } = req.body

        if(!name || !donationLineIds){
            res.status(400);
            throw new Error("All Fields are mandatory");
        }

        //add required default values
        currentDonation.name = name;
        currentDonation.donorId = currentUser._id
        currentDonation.donorType = "business"

        const {
            donationLinesList,
            totalDonationQuantity,
            totalOrginalAmt,
            totalDiscountAmt,
            totalTaxAmt,
            totalFinalAmt,
            freeProductCount

        } = await createDonationLines(req,res,next,donationLineIds)
        //create donation
        let donation = await  donationModel.create(currentDonation);
        //add donatoion properties
        donation.totalDonationQuantity = totalDonationQuantity;
        donation.originalAmt = totalOrginalAmt;
        donation.discountAmt = totalDiscountAmt;
        donation.totalTaxAmt = totalTaxAmt;
        donation.finalAmt = totalFinalAmt;
        donation.isFree = donationLinesList.length == freeProductCount ? true : false;

        donationLinesList.forEach((donationLine) => {
            donationLine.donationId = donation._id;
        });

        const insertedLineDocuments = await donationLineModel.insertMany(donationLinesList)
        donation.donationLineIds = insertedLineDocuments.map((doc) =>{
            return doc._id
        });

        await donation.save();
        donation = await donationModel.findById(donation._id).populate("donationLineIds orderIds");

        res.status(201).json(donation);
    }else{

        const {
            name,
            totalQuantity,
            expiryDate,
        } = req.body

        if ( ! totalQuantity || ! expiryDate){

            res.status(400);
            throw new Error("All fields are mandatory!");
        }
        expiryDate = expiryDate instanceof Date ? expiryDate : new Date(expiryDate)
        if(expiryDate.getTime() <= (new Date()).getTime() ){

            res.status(400);
            throw new Error("Invalid expire date");
        }

        //user only make donation free beacuse they dont have proper GSIN number to make transactions
        currentDonation.name = name;
        currentDonation.donorId = currentUser._id;
        currentDonation.donorType = "user"
        currentDonation.totalDonationQuantity = totalQuantity;
        currentDonation.expiryDate = expiryDate;

       const donationRecord = await donationModel.create(currentDonation);
        res.status(201).json(donationRecord);

    }
});

//@desc delete donation records only if status is Open
//@route /api/donations/:id
//@method PUT
//access private

const updateDonation = asyncHandler( async(req,res) => {

});

//@desc delete donation records only if status is Open
//@route /api/donations/:id
//@method DELETE
//access private

const deleteDonations = asyncHandler( async (req,res) => {

    const donationId = req.params
    const currentDonation = await donationModel.findById(donationId)  

    if(! currentDonation){
        res.status(404);
        throw new Error("donation not found")
    }

    await donationModel.findOneAndDelete({ _id: donationId })
    res.status(200).json({message : "donation is deleted successfully"})
});


module.exports = {
    getAllDonations,
    getDonationById,
    getMyDonations,
    createDonation,
    updateDonation,
    deleteDonations
}
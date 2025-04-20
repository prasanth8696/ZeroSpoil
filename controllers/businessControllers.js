const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const businessModel = require("../models/businessModel");
const userModel = require("../models/userModels");
const userExtendedModel = require("../models/userExtendedModel");
const { sendVerificationMail } = require("../utils/emailHandler");


//@desc  create new business account
//@routes /api/business/register
//@method POST
//@access public
const businessRegister = asyncHandler( async (req,res) => {

    const { name,
        email,
        password,
        businessType,
        address,
        phone } = req.body;

    if( ! name || !email || !password || !address || ! businessType ){

        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const businessUser = await businessModel.findOne({ email });
    const user = await userModel.findOne({ email })

    if ( businessUser || user ){
        res.status(400)
        throw new Error("Email Address is already taken")
    }

    //const hashedPassword = bcrypt.hash(password,process.env.SALT_ROUNDS)
    const currentBusinessUser = await businessModel.create({
        name,
        email,
        password,
        //password: hashedPassword,
        businessType,
        
    })

    const extendedDetails = await  userExtendedModel.create({
        userId: currentBusinessUser._id,
        address,
        phone,
        accountType: "business"
    })


    currentBusinessUser.usersExtendedId = extendedDetails._id 
    await currentBusinessUser.save()
    await extendedDetails.save()
    //send verification mail
    await sendVerificationMail(currentBusinessUser) 

    res.status(201).json({statusCode: 201, "message": "account created sucesssfully", data: {_id : currentBusinessUser._id,name,email,businessType,accountType : currentBusinessUser.accountType} })

});


//@desc  business account login controller
//@routes /api/business/login
//@method POST
//@access public
const businessLogin = asyncHandler( async (req,res) => {

    const { email, password } = req.body

    if ( !email || !password ){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }

    const currentBusinessUser = await businessModel.findOne({ email })

    if (!currentBusinessUser){

        res.status(404)
        throw new Error("Email address doesnt exists")
    }

    if(! currentBusinessUser.isActive){
        res.status(403)
        throw new Error("Account is not Active")
    }

    if(! currentBusinessUser.isVerified){
        if( currentBusinessUser.verificationTokenExpire && currentBusinessUser.verificationTokenExpire.getTime() > (new Date()).getTime() ){
            res.status(403)
            throw new Error("Account is not verified,please check  verification mail in your mail Box")
        }else{

            await sendVerificationMail(currentBusinessUser)
            res.status(403)
            throw new Error("Account is not verified,please check  verification mail in your mail Box")

        }
        
    }

    //bcrypt.compare(password,currentBusinessUser.password)
    if(password === currentBusinessUser.password){

        const accessToken = jwt.sign({
            user : {
                _id : currentBusinessUser._id,
                email : currentBusinessUser.email,
                businessType : currentBusinessUser.businessType,
                isBusinessUser : currentBusinessUser.isBusinessUser,
                accountType : currentBusinessUser.accountType

            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "30m"
        }
    )

    res.status(200).json({ accessToken,message: "user successfully logged in" })

    }else{
        res.status(403)
        throw new Error("Bad Crenditials")
    }
});

//@desc get current account information
//@routes /api/business/current
//@method GET
//@access private > [allowed only for current logged in user]
const getCurrentBusiness =  asyncHandler(async (req,res) => {

    const currentBusinessUser = req.user;
    const businessAccount = await businessModel.findByID(currentBusinessUser._id).select({password: 0})
    if( ! businessAccount ){

        res.status(404);
        throw new Error("account not found");
    }

    res.status(200).json({status: "success",data: businessAccount })
});


//@desc  verify business user tokens
//@routes /api/business/verifyToken
//@method GET
//@access public
const verifyBusinessUserToken = asyncHandler(async (req,res) => {

    const { token } = req.query

    if (! token ){
        res.status(401)
        throw new Error("Invalid Token")
    }

    const businessUserRecord = await businessModel.findOne({verificationToken : token })
    console.log(businessUserRecord)

    if (businessUserRecord && businessUserRecord.verificationTokenExpire.getTime()  > (new Date()).getTime() ){

        businessUserRecord.isVerified = true
        businessUserRecord.verificationToken = null
        businessUserRecord.verificationTokenExpire = null
        await businessUserRecord.save()
        res.status(200).json({message: "token verified successfully"})
    }else{

        res.status(401)
        res.json({message: "Invalid Token..."})
    }

} )



//@desc get business account information
//@routes /api/business/
//@method GET
//@access private > [ allowed only for admin user ]
//optional parameters
//limit > deafult 20
//page > deafult 1 need to implement
const getAllBusiness =  asyncHandler(async (req, res) => {

    const limit = req.query.limit || 20
    allBusinessAccounts = await businessModel.find().limit(limit)

    res.status.json({status: "success",data: allBusinessAccounts})
});


//@desc get account information by ID
//@routes /api/business/:id
//@method GET
//@access private > [ allowed only for whoever haing access for resource and admin user ]
const getBusinessById = asyncHandler(async (req,res) => {

    const businessId = req.params.id
    const businessAccount = await businessModel.findById(businessId).select({password : 0})

    if( ! businessAccount ){

        res.status(404);
        throw new Error("account not found");
    }
    res.status(200).json({ status: "success",data: businessAcount})
});



module.exports = { 
    getAllBusiness,
    getBusinessById,
    getCurrentBusiness,
    businessLogin,
    businessRegister,
    verifyBusinessUserToken

}
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
//const bcrypt = require("bcrypt")
const userModel = require("../models/userModels");
const userExtendedModel = require("../models/userExtendedModel"); 
const { sendVerificationMail } = require("../utils/emailHandler");



//@desc  signup normal user
//@routes /api/users/register
//@method POST
//@access public
const userRegister = asyncHandler ( async (req,res) => {

    const { firstName,
        lastName,
        email,
        password,
        userType,
        address,
        phone } = req.body

    if( ! firstName || !lastName || !email || !password || ! address ){

        res.status(400);
        throw new Error("All fields are mandatory !")
    }

    const User = await userModel.findOne({ email })

    if (User){
        res.status(400)
        throw new Error("Email Address already taken")
    }

    //const hashedPassword = bcrypt.hash(password,process.env.SALT_ROUNDS)
    const currentUser = await userModel.create({
        firstName,
        lastName,
        email,
        password,
        //password: hashedPassword,
        userType,
        
    })

    const extendedDetails = await  userExtendedModel.create({
        userId: currentUser._id,
        address,
        phone,
        accountType: "user"
    })


    currentUser.usersExtendedId = extendedDetails._id 
    await currentUser.save()
    await extendedDetails.save()
    //send verification mail
    await sendVerificationMail(currentUser) //need to await


    res.status(201).json({statusCode: 201, "message": "user created sucesssfully", userDetails: { id: currentUser._id,firstName, lastName, email}})
})

//@desc  login normal user
//@routes //api/users/login
//@method POST
//@access public
const userLogin = asyncHandler (async (req,res) => {

    const { email, password } = req.body

    if ( !email || !password ){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }

    const currentUser = await userModel.findOne({ email })

    if (!currentUser){

        res.status(404)
        throw new Error("Email address doesnt exists")
    }

    if(! currentUser.isActive){
        res.status(403)
        throw new Error("Account is not Active")
    }

    if(! currentUser.isVerified){
        if( currentUser.verificationTokenExpire && currentUser.verificationTokenExpire.getTime() > (new Date()).getTime() ){
            res.status(403)
            throw new Error("Account is not verified,please check  verification mail in your mail Box")
        }else{

            await sendVerificationMail(currentUser)
            res.status(403)
            throw new Error("Account is not verified,please check  verification mail in your mail Box")

        }
        
    }

    //bcrypt.compare(password,currentUser.password)
    if(password === currentUser.password){

        const accessToken = jwt.sign({
            user : {
                _id : currentUser._id,
                email : currentUser.email,
                userType : currentUser.userType,
                isBusinessUser : currentUser.isBusinessUser,
                accountType : currentUser.accountType

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
  

})

//@desc  verify user tokens
//@routes //api/users/verifyToken
//@access public
const verifyUserToken = asyncHandler (async (req,res) => {

    const { token } = req.query

    if (! token ){
        res.status(401)
        throw new Error("Invalid Token")
    }

    const userRecord = await userModel.findOne({verificationToken : token })
    console.log(userRecord)

    if (userRecord && userRecord.verificationTokenExpire.getTime()  > (new Date()).getTime() ){

        userRecord.isVerified = true
        userRecord.verificationToken = null
        userRecord.verificationTokenExpire = null
        await userRecord.save()
        res.status(200).json({message: "token verified successfully"})
    }else{

        res.status(401)
        res.json({message: "Invalid Token..."})
    }

} )


module.exports = {
    userRegister,
    userLogin,
    verifyUserToken
}
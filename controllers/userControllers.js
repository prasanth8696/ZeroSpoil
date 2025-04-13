const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModels");
const userExtendedModel = require("../models/userExtendedModels"); 
const generateToken = require("../utils/generateToken");
const sendMail = require("../utils/emailHandler")



//send  verification mail
const sendVerificationMail = async (currentUser) =>{

    try{    //send verification mail
        const token = generateToken(64)
        const verificationUrl = `http://localhost:8000/api/users/verifyToken?token=${token}`

        const emailResult = await sendMail("Email Verification",currentUser.email, `<a>${verificationUrl}</a>`)

        if (emailResult.status == "success"){
            currentUser.verificationToken = token
            const tokenExpiryTime = new Date()
            tokenExpiryTime.setHours(tokenExpiryTime.getHours() + 6 )
            currentUser.verificationTokenExpire =  tokenExpiryTime

            await currentUser.save()
        }else{
            console.log(emailResult)
        }
    }catch(err){
        console.log(err)
    }

} 

//@desc  signup normal user
//@routes //api/users/register
//@access public
const userRegister = asyncHandler ( async (req,res) => {

    const { firstName,lastName,email, password,userType } = req.body

    if( ! firstName || !lastName || !email || !password ){

        res.status(400);
        throw new Error("All fields are madatory !")
    }

    const User = await userModel.findOne({ email })

    if (User){
        res.status(400)
        throw new Error("Email Address already taken")
    }

    const currentUser = await userModel.create({
        firstName,
        lastName,
        email,
        password,
        userType,
        
    })

    const { address, phone } = req.body

    const extendedDetails = await  userExtendedModel.create({
        userId: currentUser._id,
        address,
        phone,
        userType: "user"
    })


    currentUser.usersExtendedId = extendedDetails._id 
    await currentUser.save()
    await extendedDetails.save()
    //send verification mail
    sendVerificationMail(currentUser)


    res.status(201).json({statusCode: 201, "message": "user created sucesssfully", userDetails: { id: currentUser._id,firstName, lastName, email}})
})

//@desc  login normal user
//@routes //api/users/login
//@access public
const userLogin = asyncHandler (async (req,res) => {

    const { email, password } = req.body

    if ( !email || !password ){
        res.status(400)
        throw new Error("All fields are mandatory !")
    }

    const user = await userModel.findOne({ email })

    if (user){
        res.status(200)
        res.status(200).json({messsage: "user successfully logged in"})
    }
    else{
        res.status(404)
        throw new Error("Email or passsword is incorrect")
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
const nodemailer = require("nodemailer");
const generateToken = require("../utils/generateToken");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "ayyappand464@gmail.com",
      pass: "dfgceorucbxbnbik",
    },
  });

const sendMail = async (subject,toAddress,body) => {

    try{
        const info = await transporter.sendMail({
            from: 'ayyappand464@gmail.com', // sender address
            to: toAddress, // list of receivers
            subject: subject, // Subject line
            html: body, // html body
          });

          console.log("Message sent: %s", info.messageId);

          return {
            messageId: info.messageId,
            status: "success"
          }
    }catch(err){

            console.log(err)
            return {
                messageId: err,
                status: "failure"
              }
    }
  }

const sendVerificationMail = async (currentUser,) =>{

    try{    //send verification mail
        const token = generateToken(currentUser.email)
        const verificationUrl = currentUser.accountType === "user" ? `${process.env.FRONTEND_URL}/users/verifyToken?token=${token}` : `${process.env.FRONTEND_URL}/business/verifyToken?token=${token}`

        const emailResult = await sendMail("Email Verification",currentUser.email, `<a>${verificationUrl}</a>`)

        if (emailResult.status == "success"){
            currentUser.verificationToken = token
            const tokenExpiryTime = new Date()
            tokenExpiryTime.setHours(tokenExpiryTime.getHours() + 2 )
            currentUser.verificationTokenExpire =  tokenExpiryTime

            await currentUser.save()
        }else{
            console.log(emailResult)
        }
    }catch(err){
        console.log(err)
    }

} 

  module.exports = {
    sendVerificationMail,
    sendMail
  }
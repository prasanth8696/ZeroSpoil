const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "ayyappand464@gmail.com",
      pass: "dfgceorucbxbnbik",
    },
  });

//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: 'ayyappand464@gmail.com', // sender address
//       to: "ayyappandharmavpm@gmail.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
  
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }
  
//   main().catch(console.error);

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

  module.exports = sendMail
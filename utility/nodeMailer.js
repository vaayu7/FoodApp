"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail=async function sendMail(str, data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
 // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "vk747573@gmail.com", // generated ethereal user
      pass: "aqzbsvxqigxvpjna", // generated ethereal password
    },
  });

  // send mail with defined transport object
  var OSubject, Otext, Ohtml;
  if(str=="signup"){
      OSubject=`Thankyou for Signing ${data.name}`;
      Ohtml=
      `<h1>Welcome To foodApp.com</h1>
      Hope You Have a good Time!
      Here Are your Details-
      Name-${data.name}
      Email-${data.email}`
  }
  else if(str==resetpassword){
    OSubject=`Reset Password `;
    Ohtml=
    `<h1>foodApp.com</h1>
    Here Are your Link To reset your Password!-
    -${data.resetpasswordLink}`
  }
  let info = await transporter.sendMail({
    from: '"Food App 👻" <Vk747573@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: OSubject ,// Subject line
    // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
 // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

//sendMail().catch(console.error);

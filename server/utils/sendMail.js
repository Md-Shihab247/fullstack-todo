const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_user,
        pass: process.env.EMAIL_PASS
    }
})


const sendMail = async (email, verificationToken) => {
   let verifyLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`
  await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `<h1>Verify your email</h1>
        <h3>Click <a href="${verifyLink}">here</a> to verify your email</h3>`
    })

}

module.exports = sendMail
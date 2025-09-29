const userModel = require("../../model/userModel")
let bcrypt = require('bcryptjs')
let nodemailer = require('nodemailer')
let jwt = require('jsonwebtoken') 

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_user,
        pass: process.env.EMAIL_PASS
    }
})

const ragistrationController = async (req, res) => {
   let {username,email,password} = req.body
   let errors = {}
   let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
   let isEmailValid = pattern.test(email)
   let hash = await bcrypt.hash(password, 10)
   
   errors.username = !username ? "username is required" : ''
   errors.email = !email ? "email is required" : isEmailValid ? '' : "email is not valid"
   errors.password = !password ? "password is required" : password.length < 8 ? "password must be 8 characters long" : ''
   if (errors.username || errors.password || errors.email) {
       return res.status(400).json({error : errors})
   }
   let isUserExist = await userModel.findOne({email})
   if(isUserExist) return res.status(400).json({error : 'user already exist'})
   
    let user = new userModel({
          username: username,
          email: email,
          password: hash,
          isVerified: false
      })

  try {
    await user.save()

    let verificationToken = jwt.sign(
        {id: user._id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1d'})

    let verifyLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `<h1>Verify your email</h1>
        <h3>Click <a href="${verifyLink}">here</a> to verify your email</h3>`
    })   
 
    res.status(201).send({message : 'Account created successfully'})
    
  } catch (error) {
    console.log('when trying to save data in database' + error);
    
  }
  
}

module.exports = ragistrationController

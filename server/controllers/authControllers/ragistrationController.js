const userModel = require("../../model/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 
const Queue = require('bull')
const sendMail = require("../../utils/sendMail")



let emailQueue = new Queue('email', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_POR,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD
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

    await emailQueue.add('verifyEmail', {email : user.email, token: verificationToken}, {
        attempts: 5,
        backoff: 5000,
        removeOnComplete: true // Automatically remove ( job success )
    })
    res.status(201).send({message : 'Account created successfully'})
    
  } catch (error) {
    console.log('when trying to save data in database' + error);
    
  }
  
}

emailQueue.process('verifyEmail', async (job) => {
    try {
        sendMail(job.data.email, job.data.token)
    } catch (error) {
        console.log("email not sent" + error)
    }
}) 
  
 

module.exports = ragistrationController

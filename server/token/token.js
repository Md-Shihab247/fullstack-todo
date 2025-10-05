let jwt = require('jsonwebtoken') 
const generateAccessToken = (user)=>{
  
    return jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15min'})

}
const generateRefreshToken = (user) => {
  return jwt.sign({id: user._id}, process.env.Refresh_TOKEN_SECRET, {expiresIn: '365d'})
}

module.exports = {generateAccessToken, generateRefreshToken} 
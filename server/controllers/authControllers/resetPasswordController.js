const userModel = require("../../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs") 

const resetPasswordController = async (req, res) => {
    let {token} = req.params
    let {password} = req.body
    let hash = await bcrypt.hash(password, 10)
  try {
    if(!token) return res.status(401).json({error: "Invalid token"})
    let decode = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
    let user = await userModel.findByIdAndUpdate(decode.id, {password: hash}, {new: true})
    await user.save()
    res.send({message: "Password reset successfully"})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Token invalid or expired" });
  }
}

module.exports = resetPasswordController
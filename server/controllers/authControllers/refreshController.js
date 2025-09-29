const userModel = require("../../model/userModel")
const jwt = require('jsonwebtoken')
const {generateAccessToken} = require('../../token/token')

const refreshController = async (req,res) => {
    try {
        let token = req.cookies.refreshToken        
        if(!token) return res.status(401).json({error : 'No token found'})
        
        let userExist = await userModel.findOne({refreshToken : token})
        if(!userExist) return res.status(401).json({error : 'Invalid token'})

        jwt.verify(token , process.env.Refresh_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.status(401).json({error : 'Invalid token'})
            let accessToken = generateAccessToken(userExist)
            res.json({accessToken})

            console.log('Decoded token:', decoded);

        })
    } catch (error) {
        
        console.log(error);
        res.status(500).json({error : 'Server error'})
    }
}

module.exports = refreshController
let jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next) => {
    let header = req.headers.authorization
    if(!header) return res.status(401).json({message: 'You are not authorized'})    
    let token = header.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded) => {
        if(err){ 
            return res.status(401).json({message: 'You are not authorized'}) 
        }
        req.user = decoded
        next()
    })
}

module.exports = authMiddleware  
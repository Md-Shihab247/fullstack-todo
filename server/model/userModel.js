let mongoose = require('mongoose')
let {Schema} = mongoose

let usermodel = new Schema({
    username: String,
    email:{ 
        type: String,
        unique: true
    },
    password: String,
    refreshToken: String,
    isVerified: Boolean
}) 

module.exports = mongoose.model('user', usermodel)
let mongoose = require('mongoose');
let dns = require('dns');

// Set DNS servers to Google's public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

let connectDB = async ()=>{

    mongoose.connect(process.env.MONGO_URI, {
        family: 4,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    .then(()=>console.log('Database connected'))
    .catch(err=>console.log(`Database connection error ` + err))

 }

 module.exports = connectDB
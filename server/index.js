const cors = require('cors');
require('dotenv').config()
let express = require('express');
let app = express();
const connectDB = require('./Database/database');
let authRoutes = require('./routes/authRoutes') 
let todoRoutes = require('./routes/todoRoutes') 
const cookieParser = require('cookie-parser');

connectDB()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/todo', todoRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server is running');
});

const cors = require('cors') 
require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/database')
const authRoutes = require('./routes/authRoutes') 
const todoRoutes = require('./routes/todoRoutes') 
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc') 

connectDB()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))


 swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MERN Stack Todo API',
            version: '1.0.0',
            description: 'This is full-stack Todo API',
        },
        servers: [
            {
                url: 'http://localhost:8000/api',
            },
        ],
    },
    apis: ['./routes/*.js'],
}

const specs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(cookieParser())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/api/auth', authRoutes)
app.use('/api/todo', todoRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})

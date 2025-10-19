const multer = require('multer') 
const express = require('express')
const createTodoController = require('../controllers/todoControllers/createTodoController')
const authMiddleware = require('../middlewares/authMiddleware')
const getAllTodosController = require('../controllers/todoControllers/getAllTodosController')
const updateTodoController = require('../controllers/todoControllers/updateTodoController')
const deleteTodoController = require('../controllers/todoControllers/deleteTodoController')
const router = express.Router()
const cloudinary = require('../config/cloudinaryConfig')
const {CloudinaryStorage} = require('multer-storage-cloudinary')



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'todo',
    resource_type: 'auto',
    allowedFormats: ['jpg', 'jpeg', 'png','mp4','mov'],
  }
})
const upload = multer({ storage: storage })

router.post('/create', authMiddleware , upload.single('avatar'), createTodoController)
router.get('/get-all-todos', authMiddleware, getAllTodosController)
router.put('/update/:id', authMiddleware, upload.single('avatar'), updateTodoController)
router.delete('/delete/:id', authMiddleware, deleteTodoController)


module.exports = router
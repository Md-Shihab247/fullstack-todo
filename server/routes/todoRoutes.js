let express = require('express')
const createTodoController = require('../controllers/todoControllers/createTodoController')
const authMiddleware = require('../middlewares/authMiddleware')
let multer = require('multer') 
let router = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, './uploads') },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })

router.post('/create', authMiddleware , upload.single('avatar'), createTodoController)


module.exports = router
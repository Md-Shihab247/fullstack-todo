const todosModel = require("../../model/todosModel")


const createTodoController = async (req,res) => {
  
    try {
    let {text} = req.body
    let mediaPath = null
    let mediaType = null
    console.log(req.file)

    if (req.file) {
        mediaPath = req.file.path
        if (req.file.mimetype.startsWith('image/')) { mediaType = 'image' }
        if (req.file.mimetype.startsWith('video/')) { mediaType = 'video' }
    }
    
    let todo = new todosModel({
            userId: req.user.id,
            text,
            mediaPath,
            mediaType
    })
    await todo.save()
    res.status(201).json({message: 'Todo created successfully'})
    } 
    catch (error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }

}
 

module.exports = createTodoController
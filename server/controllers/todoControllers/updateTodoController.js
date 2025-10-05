const todosModel = require("../../model/todosModel")

const updateTodoController = async (req, res) => {
    let {text} = req.body
    let user = await todosModel.findOne({ _id: req.params.id, userId: req.user.id })
    if (!user) {
        return res.status(404).send({ message: "Todo not found" })
    }
    if (text) {
        user.text = text
    }
    if(req.file) {
        user.mediaPath = req.file.path
        if (req.file.mimetype.startsWith('image/')) { user.mediaType = 'image' }
        if (req.file.mimetype.startsWith('video/')) { user.mediaType = 'video' }
    }
    await user.save()
    res.send({ message: "Todo updated successfully" })
}

module.exports = updateTodoController
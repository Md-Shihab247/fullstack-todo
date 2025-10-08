const todosModel = require("../../model/todosModel")

const getAllTodosController = async(req, res) => {
    try {
        
        let {page,limit,type,search} = req.query
        let query = {userId: req.user.id}
        if (type) {
            query.mediaType = type
        }
        if(search) {
           query.text = {
            $regex: search,
            $options: 'i'
        }
    } 
    let todos = await todosModel.find(query).sort({createdAt: -1})
    .skip((page-1)*limit)
    .limit(Number(limit))

    res.send({
        page: Number(page),
        limit: Number(limit),
        totalItems: todos.length,
        totalPages: todos.length / Number(limit),
        todos
    })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
 
} 

module.exports = getAllTodosController
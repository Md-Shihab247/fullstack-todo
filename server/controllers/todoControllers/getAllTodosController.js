const e = require("express")
const todosModel = require("../../model/todosModel")

const getAllTodosController = async(req, res) => {
    try {
        let todos = await todosModel.find({ userId: req.user.id })
        res.status(200).json(todos)
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

module.exports = getAllTodosController
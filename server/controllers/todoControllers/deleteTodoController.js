const todosModel = require("../../model/todosModel")

const deleteTodoController = async (req, res) => {
   try {
        let todo = await todosModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        })
        if (!todo) {
            return res.status(404).send({ message: "Todo not found" })
        }
        res.status(200).send({ message: "Todo deleted successfully" })
   } catch (error) {
      res.status(500).send({ message: error.message })
   }
}

module.exports = deleteTodoController 
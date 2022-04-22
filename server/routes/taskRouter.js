const Router = require("express")
const router = new Router()
const TaskController = require("../constrollers/taskController")

router.get("/", TaskController.getTasks)
router.post("/", TaskController.createTask)
router.get("/:id", TaskController.getTask)
router.put("/:id", TaskController.updateTask)
router.delete("/:id", TaskController.deleteTask)

module.exports = router
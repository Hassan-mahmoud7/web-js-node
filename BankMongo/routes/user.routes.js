const router = require("express").Router()
const userController = require("../app/controller/user.controller")
router.get("/", userController.home)
router.get("/add", userController.add)
router.post("/add", userController.addLogicGet)
router.get("/users/:id", userController.single)
router.get("/addLogicGet", userController.addLogicGet)
router.get("/addTransaction/:id", userController.addTransaction)
router.post("/addTransaction/:id", userController.addTransactionLogic)

module.exports = router
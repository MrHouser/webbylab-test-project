const express = require("express")
const usersHandler = require("../handlers/users")

const router = express.Router()

router.post("/", usersHandler.usersPostRequestHandler)

module.exports = router

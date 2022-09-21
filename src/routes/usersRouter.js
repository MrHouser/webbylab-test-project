const express = require("express")
const router = express.Router()

const usersHandler = require("../handlers/users")

router.post("/", usersHandler.usersPostRequestHandler)

module.exports = router

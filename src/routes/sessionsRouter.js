const express = require("express")
const { sessionsPostRequestHandler } = require("../handlers/sessions")

const router = express.Router()

router.post("/", sessionsPostRequestHandler)

module.exports = router

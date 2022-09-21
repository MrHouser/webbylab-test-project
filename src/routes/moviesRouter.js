const express = require("express")
const router = express.Router()

router.get("/", async (req, res) => {
  res.json({
    status: "succes",
    code: 200,
    message: "Hello from movies",
  })
})

module.exports = router

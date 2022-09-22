const express = require("express")

const usersRouter = require("./routes/usersRouter")
const sessionsRouter = require("./routes/sessionsRouter")
const moviesRouter = require("./routes/moviesRouter")

const BASE_URL = "/api/v1"
const app = express()

app.use(express.json())

app.use(`${BASE_URL}/users`, usersRouter)
app.use(`${BASE_URL}/sessions`, sessionsRouter)
app.use(`${BASE_URL}/movies`, moviesRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app

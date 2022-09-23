require("dotenv").config({ path: `__dirname/../.env` })
const { sequelize } = require("../db/db")
const { syncDb } = require("../db/syncDb")
const app = require("../app")

const PORT = process.env.APP_PORT || 3000

;(async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    syncDb()
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    process.exit(1)
  }
})()

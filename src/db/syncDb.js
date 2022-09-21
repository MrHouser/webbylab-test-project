const { User } = require("../models/index")

const syncDb = async () => {
  await User.sync()
}

module.exports = { syncDb }

const { User, Movie } = require("../models/index")

const syncDb = async () => {
  await User.sync()
  await Movie.sync()
}

module.exports = { syncDb }

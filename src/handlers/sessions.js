const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../models")
const { id } = require("../schemas/sessions")
const sessionsSchema = require("../schemas/sessions")

const sessionsPostRequestHandler = async (req, res) => {
  try {
    const { error } = sessionsSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    const userPassword = user.get(password)
    const userId = user.get(id)

    if (user && (await bcrypt.compare(password, userPassword))) {
      const token = jwt.sign(
        { user_id: userId, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      )

      return res.status(200).json({
        token,
        status: "success",
      })
    }
    res.status(400).json({ message: "Invalid Credentials" })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { sessionsPostRequestHandler }

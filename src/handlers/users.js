const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const usersSchema = require("../schemas/user")
const { User } = require("../models/users")
const { id } = require("../schemas/user")

const usersPostRequestHandler = async (req, res) => {
  try {
    const { error } = usersSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.message })
    }

    const { email, name, password } = req.body
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exist" })
    }

    encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email: email.toLowerCase(),
      name,
      password: encryptedPassword,
    })
    const userId = user.get(id)

    const token = jwt.sign({ user_id: userId, email }, process.env.TOKEN_KEY, {
      expiresIn: "1d",
    })

    res.status(201).json({
      token,
      status: "success",
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  usersPostRequestHandler,
}

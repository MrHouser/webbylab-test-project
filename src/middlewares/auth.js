const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]

    if (!token) {
      return res.status(403).json({ message: "A token is required" })
    }
    const decoded = jwt.verify(token.slice(7), process.env.TOKEN_KEY)
    req.user = decoded
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" })
  }
  return next()
}

module.exports = verifyToken

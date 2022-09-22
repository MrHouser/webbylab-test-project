const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].slice(7)

  if (!token) {
    return res.status(403).json({ message: "A token is required" })
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    req.user = decoded
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" })
  }
  return next()
}

module.exports = verifyToken

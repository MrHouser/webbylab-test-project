const Joi = require("joi")

const queryValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query)
    if (!error) {
      next()
    } else {
      const { details } = error
      const message = details.map((i) => i.message).join(",")
      console.log("error", message)
      res.status(422).json({ error: message })
    }
  }
}
module.exports = queryValidator

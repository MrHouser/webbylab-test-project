const queryValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query)
    if (!error) {
      next()
    } else {
      res.status(422).json({ error: error.message })
    }
  }
}
module.exports = queryValidator

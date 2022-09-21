const Joi = require("joi")

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .error(new Error("confirmPassword must be equal with password")),
})

module.exports = schema

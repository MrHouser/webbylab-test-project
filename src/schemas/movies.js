const Joi = require("joi")

const postMoviesSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  year: Joi.number().min(1850).max(2022).required(),
  format: Joi.string().valid("VHS", "DVD", "Blu-Ray").required(),
  actors: Joi.array().items(Joi.string()).required(),
})

module.exports = { postMoviesSchema }

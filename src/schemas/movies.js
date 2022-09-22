const Joi = require("joi")

const postMoviesSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  format: Joi.string().required(),
  actors: Joi.array().items(Joi.string()).required(),
})

module.exports = { postMoviesSchema }

const Joi = require("joi")

const moviesQueryParamsSchema = Joi.object({
  actor: Joi.string()
    .pattern(/([a-zA-Z])\w+/)
    .optional()
    .trim()
    .min(2)
    .messages({
      "string.pattern.base":
        "actor parameter can only consist of letters and must be minimum 2 characters long",
    }),
  title: Joi.string()
    .pattern(/([a-zA-Z])\w+/)
    .optional()
    .trim()
    .min(2)
    .messages({
      "string.pattern.base":
        "title parameter can only consist of letters and must be minimum 2 characters long",
    }),
  search: Joi.string()
    .pattern(/([a-zA-Z])\w+/)
    .optional()
    .trim()
    .min(2)
    .messages({
      "string.pattern.base":
        "search parameter can only consist of letters and must be minimum 2 characters long",
    }),
  sort: Joi.string()
    .valid("id", "title", "year")
    .optional()
    .default("id")
    .messages({
      "any.only": "sort parameter could be one of: id, title, year",
    }),
  order: Joi.string().valid("ACS", "DESC").optional().default("ACS").messages({
    "any.only": "order parameter could be one of: ACS, DESC",
  }),
  limit: Joi.string()
    .pattern(/^[0-9]+$/)
    .optional()
    .default("20")
    .messages({
      "string.pattern.base": "limit parameter must be number",
    }),
  offset: Joi.string()
    .pattern(/^[0-9]+$/)
    .optional()
    .default("0")
    .messages({
      "string.pattern.base": "offset parameter must be number",
    }),
})
module.exports = { moviesQueryParamsSchema }

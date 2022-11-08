const Joi = require('@hapi/joi')

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body)

    if (result.error) {
      return res.status(400).json(result.error)
    } else {
      if (!req.value) req.value = {}
      if (!req.value['params']) req.value.params = {}

      req.value.body = result.value
      next()
    }
  }
}

const validateParam = (schema, name) => {
  return (req, res, next) => {
    const Validator = schema.validate({ param: req.params[name] })

    if (Validator.error) {
      return res.status(400).json(Validator.error)
    } else {
      if (!req.value) req.value = {}
      if (!req.value['params']) req.value.params = {}

      req.value.params[name] = req.params[name]
      next()
    }
  }
}

const schemas = {
  signInSchema: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(5).required()
  }),

  signUpSchema: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(5).required()
  }),

  // idSchema: Joi.object().keys({
  //   param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() //validate userID from 0 to 9, a to f, A to F, 24 chars
  // }),

  // newDeck: Joi.object().keys({
  //   name: Joi.string().min(6).required(),
  //   description: Joi.string().min(10).required(),
  //   owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  // }),

  // userOptional: Joi.object().keys({
  //   firstName: Joi.string().regex(/^[a-zA-Z]/).min(2),
  //   lastName: Joi.string().regex(/^[a-zA-Z]/).min(2),
  //   email: Joi.string().email()
  // }),

  // userSchema: Joi.object().keys({
  //   firstName: Joi.string().regex(/^[a-zA-Z]/).min(2).required(),
  //   lastName: Joi.string().regex(/^[a-zA-Z]/).min(2).required(),
  //   email: Joi.string().email().required()
  // })
}

module.exports = {
  validateBody,
  validateParam,
  schemas
}
const express = require('express')
const router = require('express-promise-router')()

const UserControler = require('../controllers/users')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/') //for all users
  .get(UserControler.index)
  .post(validateBody(schemas.userSchema), UserControler.newUser)

router.route('/signup').post(validateBody(schemas.signUpSchema), UserControler.signUp)

router.route('/signin').post(validateBody(schemas.signInSchema), UserControler.signIn)

router.route('/:userID')
  .get(validateParam(schemas.idSchema, 'userID'), UserControler.getUser)
  .put(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), UserControler.replaceUser)
  .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptional), UserControler.updateUser)

module.exports = router //to be recognized by other files
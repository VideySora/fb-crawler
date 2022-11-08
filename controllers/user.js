const User = require('../models/User')
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi')
const idSchema = Joi.object().keys({
    userID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const getUser = async (req, res, next) => {
    // const { userID } = req.value //router helpers created params in value when checked -> use value.params
    const { userID } = req.value.params

    const user = await User.findById(userID)

    return res.status(200).json({ user })
}

const getUserDeck = async (req, res, next) => {
    const { userID } = req.value.params

    // get user
    const user = await User.findById(userID).populate('decks')

    return res.status(200).json({ deck: user.decks })
}

const newUserDeck = async (req, res, next) => {
    const { userID } = req.value.params

    // Create a new deck
    const newDeck = new Deck(req.body)

    // Get user
    const user = await User.findById(userID)

    // Assign user to deck
    newDeck.owner = user

    // Save deck
    await newDeck.save()

    // Add deck to users'
    user.decks.push(newDeck._id)

    // Save user
    await user.save()

    res.status(201).json({ deck: newDeck })
}

const index = async (req, res, next) => {
    // Async/await way
    const users = await User.find({})
    return res.status(200).json({ users })
}

const newUser = async (req, res, next) => {
    // create object model
    const newUser = new User(req.value.body)

    await newUser.save()

    return res.status(201).json({ newUser })

}

const replaceUser = async (req, res, next) => {
    // enforce new user to old user
    const { userID /*, add more if needed */ } = req.value.params

    const newUser = req.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({ success: true })
}

const secret = async (req, res, next) => {
    console.log('Called to secret function.')
}

const signIn = async (req, res, next) => {
    console.log('Called to signIn function')
    const { username, password } = req.value.body
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Check users
    const foundUser = await User.findOne({ username, hashPassword })
    if (foundUser) res.redirect('/home')
    else return res.status(403).json({ error: { message: 'Username or Password is not correct!' } })
    // const user = await User.findOne({username: req.body.username});
    // if (!user) return res.status(422).send('Username or Password is not correct');

    // const checkPassword = await bcrypt.compare(req.body.password, user.password);

    // if (!checkPassword) return res.status(422).send('Email or Password is not correct');

    // return res.redirect("/home");
    //return res.send(`User ${user.username} has logged in`);
}

const signUp = async (req, res, next) => {
    console.log('Called to signUp function')
    const { username, email, password } = req.value.body;

    // Check users
    const foundUser = await User.findOne({ username, email })
    if (foundUser) return res.status(403).json({ error: { message: 'Username has already been used!' } })

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username: username, email: email, 
                                password: hashPassword })
    await newUser.save()

    // res.status(201).send("Register successful.");
    return res.redirect("/login");
}

const updateUser = async (req, res, next) => {
    // number of fields
    const { userID /*, add more if needed */ } = req.value.params

    const newUser = req.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({ success: true })
}

module.exports = {
    getUser,
    getUserDeck,
    index,
    newUser,
    newUserDeck,
    replaceUser,
    secret,
    signIn,
    signUp,
    updateUser
}
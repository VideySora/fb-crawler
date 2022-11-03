const User = require('../models/User')

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

// const index = (req, res, next) => {
//     // Callback way
//     User.find({}, (err, users) => {
//         if (err) next(err)

//         return res.status(200).json({users})
//     })
// }

// const index = (req, res, next) => {
//     // Promises way
//     User.find({}).then(users => {   //User.find({}) <- find all users
//         return res.status(200).json({users})
//     }).catch(err => next(err))
// }

const index = async (req, res, next) => {
    // Async/await way
    const users = await User.find({})
    return res.status(200).json({ users })
}

// const newUser = (req, res, next) => {
//     console.log('req.body content ', req.body)
//     // create object model
//     const newUser = new User(req.body)
//     console.log('newUser ', newUser)
//     newUser.save((err, user) => {
//         console.error('Error ', err) //if error, throw error else log user
//         console.log('User saved ', user)
//         return res.status(201).json({user})
//     })
// }

// const newUser = (req, res, next) => {
//     console.log('req.body content ', req.body)
//     // create object model
//     const newUser = new User(req.body)
//     console.log('newUser ', newUser)
//     newUser.save().then(user => {
//         return res.status(201).json({user})
//     }).catch(err => next(err))
// }

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
    const { username, password } = req.body

    // Check users
    const foundUser = await User.findOne({ username, password })
    if (foundUser) res.redirect('/home')
    else return res.status(403).json({ error: { message: 'Username not found!' } })
}

const signUp = async (req, res, next) => {
    console.log('Called to signUp function')
    const { username, password } = req.body

    // Check users
    const foundUser = await User.findOne({ username })
    if (foundUser) return res.status(403).json({ error: { message: 'Username has already been used!' } })

    // Create new user
    const newUser = new User({ username, password })
    newUser.save()

    return res.status(201).json({ success: true })
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
const mongoose = require('mongoose')
const url = 'mongodb+srv://namkha:namkha@learnmongofinal.ac5nofz.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'CSS is hard',
  date: new Date(),
  important: false,
})

if ( false ) {
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
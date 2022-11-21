const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const Project = require('./models/project');
const Grouppage = require('./models/grouppage');
const Baipost = require('./models/baipost');

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.json())

app.use(requestLogger)

app.use(cors())

app.use(express.static('build'))
/////////////////////////////////////////////////////////////////////////////////////////////
// Connect to database
const url = 'mongodb+srv://namkha:namkha@fbcrawlercluster.dr1okg4.mongodb.net/?retryWrites=true&w=majority'
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
/////////////////////////////////////////////////////////////////////////////////////////////
// GET /projects
// get all projects
app.get('/api/projects', (request, response) => {
  Project.find({}).then(pro => {
    response.json(pro)
  })
})
// GET /grouppages
// get all grouppages
app.get('/api/grouppages', (request, response) => {
  Grouppage.find({}).populate('project').then(gp => {
    response.json(gp)
  })
})
// POST /projects
// create new project
app.post('/api/projects', (request, response) => {
  const newProject = new Project(request.body);
  newProject.save().then(newPro => {
    response.json(newPro)
  })
})
// POST /projects/:pid
// create new grouppage
app.post('/api/projects/:pid', async (request, response) => {
  const pid = request.params.pid;
  const project = await Project.findOne({_id:pid});
  let newLink = request.body.link;  
  const newGrouppage = new Grouppage();
  newGrouppage.link = newLink;
  newGrouppage.project = project;
  newGrouppage.save().then(newGP => {
    response.json(newGP)
  });
})
// DELETE /projects/:pid
// delete project
app.delete('/api/projects/:pid', (request, response, next) => {
  Grouppage.deleteMany({project:request.params.pid})
  .then(()=>{
    Project.findByIdAndRemove(request.params.pid)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })
})  
// DELETE /grouppages/:gid
// delete grouppage
app.delete('/api/grouppages/:gid', async (request, response) => {
  const { gid } = request.params;
  Grouppage.findByIdAndRemove(gid)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
////////////////////////////////////////////////////////////
// // Get a project
// app.get('/api/projects/:id', (request, response, next) => {
//   Project.findById(request.params.id)
//     .then(pro => {
//       if (pro) {
//         response.json(pro)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => {
//       next(error)
//     })
// })

// // Get a group
// app.get('/api/projects/:pid/grouppages/:gid', (request, response, next) => {
//   const { pid, gid } = request.params;
//   Grouppage.findById(gid)
//     .then(gp => {
//       if (gp) {
//       response.json(gp)
//     } else {
//       response.status(404).end()
//     }
//   } 
//     )
// })

// app.put('/api/notes/:id', (request, response, next) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })
////////////////////////////////////////////////////////////////////////////////////////////
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port 3001`)
})
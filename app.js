const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Project = require('./models/project');
const Grouppage = require('./models/grouppage');
const Baipost = require('./models/baipost');
// Connect to database
mongoose.connect('mongodb+srv://namkha:namkha@merncluster.rwc5tey.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECT SUCCESS")
    })
    .catch(err => {
        console.log("MONGO CONNECT FAILED")
        console.log(err)
    });
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});
// Home page
app.get('/', (req, res) => {
    res.redirect('/home');
})
app.get('/home', async (req, res) => {
    res.render('home.ejs')
})
// Get form to create new project
app.get('/projects/create', (req, res) => {
    res.render('projects/create.ejs')
})
// View all projects
app.get('/projects', async (req, res) => {
    const projects = await Project.find({});
    res.render('projects/index.ejs', { projects })
})
// View a specific project
app.get('/projects/:id', async (req, res) => {
    const project = await Project.findById(req.params.id).populate('grouppages');
    res.render('projects/show.ejs', { project })
})
// Create new project
app.post('/projects', async (req, res) => {
    const newProject = new Project(req.body);
    //newProject.inputlink = req.body.inputlink;
    await newProject.save();
    res.redirect(`/projects/${newProject._id}`);
})
// Update a project
app.patch('/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { scrolls } = req.body;
    const project = await Project.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    let links = req.body.inputlink.replaceAll("\n", " ").replaceAll("www.","m.").trim().split(" ");
    for (let linkk of links) {
        const newGrouppage = new Grouppage();
        project.grouppages.push(newGrouppage);
        newGrouppage.link = linkk;
        newGrouppage.project = project;
        if(scrolls > 0){
            newGrouppage.scrolls = scrolls;
        }
        await project.save();
        await newGrouppage.save();
    }
    
    res.redirect(`/projects/${project._id}`);
})
// Delete project
app.delete('/projects/:id', async (req, res) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    res.redirect('/projects');
})
// Delete group/page
app.delete('/projects/:pid/grouppages/:gid', async (req, res) => {
    const { pid, gid } = req.params;
    await Grouppage.findByIdAndDelete(gid);
    res.redirect(`/projects/${pid}`);
})
// View a specific group/page
app.get('/projects/:pid/grouppages/:gid', async (req, res) => {
    const { pid, gid } = req.params;
    const project = await Project.findById(pid);
    const grouppage = await Grouppage.findById(gid);
    res.render('grouppages/show.ejs', {project, grouppage});
})
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})
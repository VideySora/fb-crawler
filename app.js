const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const bcrypt = require('bcrypt');
const ejsMate = require('ejs-mate');
const Project = require('./models/project');
const Grouppage = require('./models/grouppage');
const Baipost = require('./models/baipost');
const bodyParser = ('body-parser')
const UserControler = require('./controllers/user')
const { validateBody, validateParam, schemas } = require('./helpers/routerHelpers');
const User = require('./models/User');
// Connect to database
mongoose.connect("mongodb://localhost/fb-crawler", { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use(session({secret: 'sthsecret'}));
app.engine('ejs', ejsMate);
app.use(express.json());

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
const requireLogin = (req, res, next) => {
    if(!req.session.userID)
        return res.redirect('/login');
    next();    
}

// Home page
app.get('/', (req, res) => {
    res.redirect('/login');
})
app.get('/home', requireLogin, async (req, res) => {
    res.render('home.ejs')
})
// Get form to create new project
app.get('/projects/create', requireLogin, (req, res) => {
    res.render('projects/create.ejs')
})
// View all projects
app.get('/projects', requireLogin, async (req, res) => {
    const projects = await Project.find({user: req.session.userID});
    res.render('projects/index.ejs', { projects })
})
// View a specific project
app.get('/projects/:id', requireLogin, async (req, res) => {
    const project = await Project.findById(req.params.id).populate('grouppages');
    res.render('projects/show.ejs', { project })
})
// Create new project
app.post('/projects', async (req, res) => {
    const newProject = new Project(req.body);
    const user = await User.findById(req.session.userID);

    user.projects.push(newProject);
    newProject.user.push(user);
    //newProject.inputlink = req.body.inputlink;
    await newProject.save();
    await user.save();
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
app.get('/projects/:pid/grouppages/:gid', requireLogin, async (req, res) => {
    const { pid, gid } = req.params;
    const project = await Project.findById(pid);
    const grouppage = await Grouppage.findById(gid);
    res.render('grouppages/show.ejs', {project, grouppage});
})
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})

// Authentication

app.get('/login', (req, res) => {
    res.render('authentication/login.ejs')
})

app.get('/signup', (req, res) => {
    res.render('authentication/signup.ejs')
})

app.post('/login', (validateBody(schemas.signInSchema)), async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(422).send('Username or Password is not correct');

    const checkPassword = await bcrypt.compare(req.body.password, user.password);

    if (!checkPassword) return res.status(422).send('Email or Password is not correct');
    req.session.userID = user._id;
    return res.redirect("/home");
})

app.post('/signup', (validateBody(schemas.signUpSchema)), async (req, res) => {
    const username = req.body.username;

    // Check users
    const foundUser = await User.findOne({ username })
    if (foundUser) return res.status(403).json({ error: { message: 'Username has already been used!' } })

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({ username: req.body.username,
                                password: hashPassword })
    await newUser.save()

    //res.status(201).send("Register successful.");
    return res.redirect("/login");
})

app.post('/logout', (req, res) => {
    req.session.userID = null;
    res.redirect('/login');
})
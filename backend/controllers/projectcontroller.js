const projectRouter = require("express").Router();
const Project = require("../models/project");
const Grouppage = require("../models/grouppage");
const Baipost = require("../models/baipost");

// GET /projects
// get all projects
projectRouter.get("/projects", (request, response) => {
  Project.find({}).then((pro) => {
    response.json(pro);
  });
});

// POST /projects
// create new project
projectRouter.post("/projects", (request, response) => {
  const newProject = new Project(request.body);
  newProject.save().then((newPro) => {
    response.json(newPro);
  });
});

// DELETE /projects/:pid
// delete project
projectRouter.delete("/projects/:pid", (request, response, next) => {
  Grouppage.deleteMany({ project: request.params.pid }).then(() => {
    Project.findByIdAndRemove(request.params.pid)
      .then((result) => {
        response.status(204).end();
      })
      .catch((error) => next(error));
  });
});

module.exports = projectRouter;

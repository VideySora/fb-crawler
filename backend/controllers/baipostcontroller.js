const baipostRouter = require("express").Router();
const Project = require("../models/project");
const Grouppage = require("../models/grouppage");
const Baipost = require("../models/baipost");

// GET /baipost
// get all baipost
baipostRouter.get("/baiposts", (request, response) => {
  Baipost.find({})
    .populate("grouppage")
    .then((bp) => {
      response.json(bp);
    });
});

// POST /grouppages/:pid
// create new baipost
baipostRouter.post("/grouppages/:gid", async (request, response) => {
  const gid = request.params.gid;
  const grouppage = await Grouppage.findOne({ _id: gid });
  const newBaipost = new Baipost();
  newBaipost.post_id = request.body.post_id;
  newBaipost.user_id = request.body.user_id;
  newBaipost.text = request.body.text;
  newBaipost.time = request.body.time;
  newBaipost.likes = request.body.likes;
  newBaipost.comments = request.body.comments;
  newBaipost.shares = request.body.shares;
  newBaipost.grouppage = grouppage;
  // share
  newBaipost.save().then((newBP) => {
    response.json(newBP);
  });
});



module.exports = baipostRouter;

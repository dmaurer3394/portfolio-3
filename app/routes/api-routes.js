const projects = require("../data/projects");
const db = require("../models");

module.exports = app => {
  app.get("/api/projects", (req, res) => {
    return res.json(projects);
  });

  app.post("/api/message", (req, res) => {
    db.Message.create(req.body).then(dbMessage => {
      res.json(dbMessage);
    });
  });
};

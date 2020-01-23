var projects = require("../data/projects");

module.exports = function(app) {
  app.get("/api/projects", function(req, res) {
    return res.json(projects);
  });
};

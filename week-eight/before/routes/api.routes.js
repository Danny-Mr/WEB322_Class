const express = require("express");
const UserService = require("../services/users.service");
apiRoutes = express.Router();

apiRoutes.get("/users", (req, res) => {
    res.json(UserService.find());
  });

  apiRoutes.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = UserService.findById(id);
    res.json(user);
  });
  
  module.exports = apiRoutes;
  
const express = require("express");
const UsersService = require("../services/users.service");
apiRoutes = express.Router();

apiRoutes.get("/users", async (req, res) => {
  const users = await UsersService.find()
  res.json(users)
});

apiRoutes.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await UsersService.findById(id);
  res.json(user);
});

apiRoutes.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const obj = await UsersService.delete(id);
  res.json(obj);
});

apiRoutes.delete("/users", async (req, res) => {
  await UsersService.create(req.body);
  res.json({user});
});



module.exports = apiRoutes;

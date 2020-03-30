const express = require("express");

const { users } = require("./users.js");
const { httpStatus } = require("./status.js");

const server = express();
const port = 3000;

server.get("/", (request, response) => {
  response.send(`server listens on port ${port}`);
});
server.get("/users/:id", (request, response) => {
  let userId = request.param(["id"]);
  let user = users.find(el => el.id === +userId);
  if (user) {
    response.json({ name: user.name, description: user.description });
  } else {
    response.statusCode = 404;
    response.json(httpStatus[404]);
  }
});

server.get("*", (request, response) => {
  response.json(users);
});

server.listen(port);
const express = require("express");

const { users } = require("../users.js");
const { httpStatus } = require("../status.js");
const { createUser } = require("../user_utils");

const server = express();
const port = 3000;

server.use(express.json());

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

server.get("/users", (request, response) => {
  response.json(users);
});

server.post("/users", (req, resp) => {
  if (createUser(req.body, users)) {
    resp.statusCode = 201;
    resp.send(JSON.stringify(users));
  } else {
    resp.statusCode = 400;
    resp.send("error");
  }
});

server.listen(port);

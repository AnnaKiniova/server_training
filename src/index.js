const http = require("http");
const fs = require("fs");
// let usersJSON = fs.createReadStream("./users.json");
// let users = JSON.parse(usersJSON.users);
const { users } = require("./users.js");
const { httpStatus } = require("./status.js");
const { parse } = require("querystring");

const { getId, validateData } = require("./post");

const port = 8080;
const server = http.createServer((request, response) => {
  const pathName = request.url.split("/");

  //const pathName = request.url.split("/");
  // console.log(pathName);

  switch (pathName[1]) {
    case "users":
      if (request.method === "GET") {
        if (!pathName[2]) {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(users));
        } else {
          const user = users.find(el => el.id === parseInt(pathName[2]));
          if (user) {
            response.writeHead(200, { "Content-Type": "application/json" });
            const { name, description } = user;
            response.write(JSON.stringify({ name, description }));
          } else {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.write(JSON.stringify(httpStatus[404]));
          }
        }
      } else if (request.method === "POST") {
        if (request.headers["content-type"] === "application/json") {
          let body = "";

          request.on("data", chunk => {
            body += chunk.toString();
          });
          request.on("end", () => {
            console.log(JSON.parse(body));
            const newUser = JSON.parse(body);
            if (validateData(newUser)) {
              newUser.id = getId(users);
              users.push(newUser);
              response.writeHead(201, { "Content-Type": "text/html" });
              console.log(users);
            } else {
              response.writeHead(404, { "Content-Type": "text/html" });
            }
          });
        } else {
          response.write("this method is not supported!");
        }
        response.end();
        break;
      }
    case "":
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(`server listens on port ${port}`);
      break;

    default: {
      response.writeHead(400, { "Content-Type": "text/html" });
      response.write(JSON.stringify(httpStatus[400]));
      break;
    }
  }
});
server.listen(port);

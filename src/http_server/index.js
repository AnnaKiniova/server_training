const http = require("http");
const fs = require("fs");
// let usersJSON = fs.createReadStream("./users.json");
// let users = JSON.parse(usersJSON.users);
const { users } = require("../users.js");
const { httpStatus } = require("../status.js");
// const parser = require("body-parser");
const { createUser } = require("../user_utils");

const port = 8080;

const server = http.createServer((request, response) => {
  const pathName = request.url.split("/");
  switch (pathName[1]) {
    case "users":
      if (request.method === "GET") {
        if (!pathName[2]) {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(users));
        } else {
          if (pathName[3]) {
            response.writeHead(400, { "Content-Type": "text/html" });
            response.write(JSON.stringify(httpStatus[400]));
          }
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
        response.end();
      }
      if (request.method === "POST") {
        if (request.headers["content-type"] !== "application/json") {
          response.write("this type of data is not supported!");
          process.stderr.write("this type of data is not supported!");
          return;
        }
        let body = "";
        request.on("data", chunk => {
          body += chunk.toString();
        });
        request.on("end", () => {
          if (createUser(JSON.parse(body), users)) {
            response.writeHead(201, { "Content-Type": "text/html" });
            response.end(JSON.stringify(users));
          } else {
            response.writeHead(404, { "Content-Type": "text/html" });
          }
        });
      }
      break;
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

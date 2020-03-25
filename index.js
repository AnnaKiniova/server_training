const http = require("http");
//const url = require("url");

const { users } = require("./users.js");
const { errors } = require("./error.js");

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    // const urlParsed = url.parse(request.url);
    // console.log(urlParsed);
    const pathName = request.url.split("/");
    console.log(pathName);

    switch (pathName[1]) {
      case "users":
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(users));
        break;
      case "user": {
        if (pathName[2]) {
          const user = users.find(el => el.id === parseInt(pathName[2]));
          if (user) {
            response.writeHead(200, { "Content-Type": "application/json" });
            const { name, description } = user;
            response.write(JSON.stringify({ name, description }));
          } else {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.write(JSON.stringify(errors[404]));
          }
        } else {
          response.writeHead(400, { "Content-Type": "text/html" });
          response.write(JSON.stringify(errors[400]));
        }
        break;
      }
      default: {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write(JSON.stringify(errors[404]));
      }
    }
  } else {
    response.write("this method is not supported!");
  }
  response.end();
});
server.listen(8080);

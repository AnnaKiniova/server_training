const http = require("http");

const { users } = require("./users.js");
const { httpStatus } = require("./status.js");

const port = 8080;
const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    const pathName = request.url.split("/");
    // console.log(pathName);

    switch (pathName[1]) {
      case "users":
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
        // } else {
        //   response.writeHead(400, { "Content-Type": "text/html" });
        //   response.write(JSON.stringify(httpStatus[400]));
        // }
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
  } else {
    response.write("this method is not supported!");
  }
  response.end();
});
server.listen(port);

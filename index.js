const http = require("http");

const { users } = require("./users.js");

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(users));
    response.end();
    console.log(request.method, request.url);
  } else {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("this method is not supported!");
    response.end();
  }
});

//response.write('hello')
server.listen(8080);

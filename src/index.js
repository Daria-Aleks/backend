const http = require('http');
const getUsers = require('./modules/users.js');

const port = 3003;
const hostname = "http://127.0.0.1";

const server = http.createServer((request, response) => {

  const ipAddress = "http://127.0.0.1";
  const url = new URL(request.url, ipAddress);

  const isUserParam = url.searchParams.has("users");
  const isHelloParam = url.searchParams.has("hello");

  if (isHelloParam) {
    const userName = url.searchParams.get("hello");
    if (userName) {
      response.statusCode = 200;
      response.statusMessage = "ok";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello, my friend ${userName}`);
      response.end();
    } else {
      response.statusCode = 400;
      response.statusMessage = "Bad Request";
      response.setHeader("Content-Type", "text/plain");
      response.write(`Enter a name`);
      response.end();
    }
    return;
  }

  if (isUserParam) {
    response.statusCode = 200;
    response.statusMessage = "OK";
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
    return;
  }

  response.statusCode = 404;
  response.statusMessage = "Not Found";
  response.setHeader("Content-Type", "text/plain");
  response.write("Not Found");
  response.end();

});

server.listen(port, () => {
  console.log(`Server running at ${hostname}:${port}/`);
});
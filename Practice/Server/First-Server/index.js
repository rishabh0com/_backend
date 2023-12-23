const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.method);
  if (req.url == "/") {
    res.end("This is Home Page");
  } else if (req.url == "/html") {
    // header : it give informatio about request and reponse
    res.setHeader("content-type", "text/html");
    res.write("<h1>This is HTML Tag</h1>");
    res.end();
  } else if (req.url == "/data") {
    fs.readFile("./db.json", (err, data) => {
      if (err) {
        res.end("Something went wrong");
      } else {
        res.end(data);
      }
    });
  } else {
    res.end("404 not found");
  }
});

server.listen(8080, () => {
  console.log("server is running now");
});

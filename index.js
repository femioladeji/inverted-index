"use strict"
var http = require('http');
var fs = require('fs');

var file = fs.readFileSync('index.html');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(file);
}).listen(3000);

console.log('go to http://localhost:3000');


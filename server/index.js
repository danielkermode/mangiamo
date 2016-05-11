const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

http.createServer((request, response) => {
  const staticDir = path.normalize(__dirname + '/../client/public');
  let filePath =  path.normalize(staticDir + request.url);
  if(request.url == '/') {
    filePath = path.normalize(staticDir + '/index.html');
  }

  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.wav':
      contentType = 'audio/wav';
      break;
  }

  fs.readFile(filePath, (error, content) => {
    if(error) {
      if(error.code == 'ENOENT') {
        //file not found
        fs.readFile(path.normalize(staticDir + '/404.html'), (error, content) => {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        });
      } else if(error.code == 'EISDIR') {
        //trying to read a directory
        const message = 'Cannot GET the directory: ' + path.basename(filePath);
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(message, 'utf-8');
      } else {
        console.log(error);
        response.writeHead(500);
        response.end('Sorry, I messed up. Error: ' + error.code + ' ..\n');
        response.end();
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });

}).listen(port);

console.log('Server running at http://localhost:' + port + '/');
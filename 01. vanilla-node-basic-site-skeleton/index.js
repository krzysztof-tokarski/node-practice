const fs = require('fs');
const dotenv = require('dotenv').config('.');
const process = require('process');
const http = require('http');

const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
};

const ENDPOINTS = new Map([
  ['/', './src/pages/index.html'],
  ['/about', './src/pages/about.html'],
  ['/contact-me', './src/pages/contact-me.html'],
]);

const NOT_FOUND_FILE = './src/pages/404.html';

const router = (request, response) => {
  const requestUrl = request.url;
  const endpointMatch = ENDPOINTS.get(requestUrl);

  if (endpointMatch) {
    response.statusCode = HTTP_STATUS.OK;
    fs.readFile(endpointMatch, (error, fileContent) => {
      response.end(fileContent, 'utf-8');
    });
  } else {
    response.statusCode = HTTP_STATUS.NOT_FOUND;
    fs.readFile(NOT_FOUND_FILE, (error, fileContent) => {
      response.end(fileContent, 'utf-8');
    });
  }
};

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer(router).listen(port, host);

// this script adjusts index.html file between production and development (so production can use minified code).
const fs = require('fs');
const path = require('path');

const filePath = path.normalize(__dirname + '/public/index.html');
const regex = process.argv[2] === 'dev'? /bundle.min.js/ : /bundle.js/;
const replacement = process.argv[2] === 'dev'? 'bundle.js' : 'bundle.min.js';

const currentHTML = fs.readFileSync(filePath, 'utf8');
const newHTML = currentHTML.replace(regex, replacement);
console.log('Replaced ' + regex + ' with ' + replacement + ' in ' + filePath);

fs.writeFileSync(filePath, newHTML, 'utf8');

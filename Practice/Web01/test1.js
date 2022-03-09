const url = require('url');
const querystring= require('querystring');

const parsedURL = url.parse('https://www.omdbapi.com/?apikey=7035c60c&s=frozen');
const query = querystring.parse(parsedURL.query);
console.log(query);
console.log(querystring.stringify(query));
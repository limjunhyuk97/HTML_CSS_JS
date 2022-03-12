const url = require('url');
const qs = require('querystring')

let parsedURL = url.parse('https://www.omdbapi.com/?apikey=7035c60c&s=frozen');
console.log('url.parse(): ', parsedURL);
console.log('url.format(): ', url.format(parsedURL));
console.log(qs.parse(parsedURL.query))

parsedURL = url.parse('http://localhost:8080/login');
console.log('url.parse(): ', parsedURL);
console.log('url.format(): ', url.format(parsedURL));
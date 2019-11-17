const url = require('url');
let str = 'http://localhost:8888/start?foo=bar&hello=world';

let parseObj = url.parse(str);
let query = parseObj.query;
let pathname = parseObj.pathname;

console.log('parseObj:',parseObj);
console.log('query:',query);
console.log('pathname:',pathname);
const exec = require("child_process").exec;
const querystring = require('querystring');
const fs = require("fs");
const formidable = require('formidable');

function start(response, request) {
  console.log("Request handler 'start' was called.");
  let body = fs.readFileSync('./post_page.html');
  response.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  response.write(body);
  response.end();
}

function upload(response, request, postData) {
  console.log("Request handler 'upload' was called.");

  response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8" });
  response.write("You've sent the text: "+ querystring.parse(postData).text);
  response.end();

  // let form = new formidable.IncomingForm();
  // form.uploadDir = "./tmp";
  // console.log("about to parse");
  // form.parse(request, (error, fields, files)=>{
  //   console.log("parsing done",files);
    
  //   fs.renameSync(files.upload.path, "/tmp/test.png");
  //   response.writeHead(200, { "Content-Type": "text/html" });
  //   response.write("received image:<br/>");
  //   response.write("<img src='' />");
  //   response.end();
  // });
}

function show(response, request) {
  fs.readFile("/tmp/test.png", "binary", (error, file) => {
    if (error) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      respoonse.write(error + '\n');
      response.end();
    } else {
      response.writeHead(200, {
        'Content-Type': 'image/png'
      });
      response.write(file, "binary");
      response.end();
    }
  })
}

function error(response) {
  console.log("Request handler 'error' was called.");
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.write("404 Not found");
  response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.error = error;
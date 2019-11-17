const http = require("http");
const url = require("url");

function start(route, handle) {
  function onRequest(request, response) {

    let postData = "";
    let pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    // route(handle, pathname, response, request);
    
    // 监听 get/post 请求
    request.setEncoding("utf8");
    request.addListener("data", (postDataChunk)=>{
      postData += postDataChunk;
      console.log("Received POST data chunk '"+ postDataChunk + "'.");
    });
    request.addListener("end", (chunks)=>{
      console.log('chunks:',chunks);
      console.log('postData:',postData);
      route(handle, pathname, response, request, postData);
    });

    
  }

  http.createServer(onRequest).listen(8889);

  console.log("Server has started.");
}

exports.start = start

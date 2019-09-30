function getUserId() {
  return new Promise(function (resolve) {
    console.log('sync code')
    resolve(111)
  })
}

function showUserId(id) {
  console.log(id);
}

var promise = getUserId();

console.log(promise)
promise.then(showUserId);

promise.then(showUserIdAgain);

function showUserIdAgain(id) {
    console.log('again !', id)
}



function Promise(fn){
  var callbacks = []
  this.then = function(cb){
    callbacks.push(cb)
    console.log(callbacks)
  }

  function resolve(value){
    // 使用setTimeout将callback放到下一轮事件循环执行
    setTimeout(function(){
      callbacks.forEach(function(cb){
        cb(value)
      })
    },0)
  }

  fn(resolve)
  
}

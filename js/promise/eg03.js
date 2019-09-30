function boilWater() {
  return new Promise(function (resolve) {
      setTimeout(function () {
          resolve('开水')
      },1000)
  })
}

function buyInstantNoodle() {
  return new Promise(function (resolve) {
      setTimeout(function () {
          resolve('泡面')
      },2000)
  })
}

var promiseofBoilWater = boilWater();
buyInstantNoodle().then(function (instantNoodle) {
  promiseofBoilWater.then(function (boiledWater) {
      console.log('你用' + boiledWater + '泡' + instantNoodle)
  })
})


function Promise(fn){
  var callbacks = []
  var state = 'pending'
  var value = null
  this.then = function(cb){
    // 若是同步调用 then, 此时 resolve 未执行, 状态值为 pendding
    if(state === 'pending'){
      callbacks.push(cb)
      console.log('callbacks',callbacks)
    }
    // 若是异步调用 then, 此时 resolve 已执行, 状态值为 fulfilled
    else{
      cb(value)
      console.log('cb invoked')
    }
    return this
  }

  function resolve(newValue){
    value = newValue
    state = 'fulfilled'
    // 使用setTimeout将callback放到下一轮事件循环执行
    setTimeout(function(){
      callbacks.forEach(function(cb){
        cb(newValue)
      })
    },0)
  }

  fn(resolve)
}
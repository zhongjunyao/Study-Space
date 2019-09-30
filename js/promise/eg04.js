function boilWater() {
  return new Promise(function (resolve) {
      setTimeout(function () {
          resolve('开水')
      },1000)
  })
}

var promiseOfBoilWater = boilWater()

promiseOfBoilWater
  .then(takeOutInstantNoodle)
  .then(eat)

function takeOutInstantNoodle(boiledWater){
  return boiledWater + '煮泡面'
}

function eat(noodle){
  console.log(noodle + ' 味道就是好！')
}


function Promise(fn){
  var handlers = []
  var state = 'pending'
  var value = null
  this.then = function(onResolved){

    return new Promise(function(resolve){
      handle({
        onResolved:onResolved,
        resolve:resolve
      })
    })
  }
  function handle(handler){
    // 若是同步调用 then, 此时 resolve 未执行, 状态值为 pendding
    if(state === 'pending'){
      handlers.push(handler)
      console.log('handlers',handlers)
    }
    // 若是异步调用 then, 此时 resolve 已执行, 状态值为 fulfilled
    else{
      if(handler.onResolved){
        // 把自身 then 执行的结果 放到下一个then 中作为参数执行
        var ret = handler.onResolved(value)
        handler.resolve(ret)
        console.log('handler invoked with onResolved')
      }
      else{
        handler.resolve(value)
        console.log('handler invoked without onResolved')
      }
    }
  }

  function resolve(newValue){
    value = newValue
    state = 'fulfilled'
    // 使用setTimeout将callback放到下一轮事件循环执行
    setTimeout(function(){
      handlers.forEach(function(handler){
        handle(handler)
      })
    },0)
  }

  fn(resolve)
}
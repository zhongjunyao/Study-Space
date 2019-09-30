boilWater()
  .then(buyInstantNoodle)
  .then(eat)

// boilWater()
//   .then(buyInstantNoodle)
//   .then(function(promiseOfBuyInstantNoodle){
//     // 要让使用的人自己处理返回的 promise
//     promiseOfBuyInstantNoodle.then(eat)
//   })

function boilWater(){
  return new Promise(function(resolve){
    setTimeout(function(){
      resolve('开水')
    }, 1000)
  })
}

function buyInstantNoodle(boiledWater){
  return new Promise(function(resolve){
    setTimeout(function(){  
      resolve(boiledWater + '煮泡面')
    }, 2000)
  })
}

function eat(noodle){
  console.log(noodle + ' 味道就是好！')
}


function Promise(fn){
  var handlers = []
  var state = 'pending'
  var value = null
  this.then = function(onResolved,onRejected){

    return new Promise(function(resolve){
      handle({
        onResolved:onResolved,
        onRejected:onRejected,
        resolve:resolve,
        reject:reject
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
    else if(state === 'fulfilled'){
      if(handler.onResolved){
        try{
          // 把自身 then 执行的结果 放到下一个then 中作为参数执行
          var ret = handler.onResolved(value)
          handler.resolve(ret)
          console.log('handler invoked with onResolved')
        }catch(e){
          handler.reject(e)
        }
      }
      else{
        handler.resolve(value)
        console.log('handler invoked without onResolved')
      }
    }
    else{
      if(handler.onRejected){
        try{
          var ret = handler.onRejected(value)
          // 因为前一个 promise 中有处理 reject 的情况
          // 所以要调用下一个 promise 的 resolve
          handler.resolve(ret)
        }catch(e){
          handler.reject(e)
        }
      }
      else{
        handler.reject(value)
      }
    }
  }

  function resolve(newValue){
    try{
      if(typeof newValue === 'object' && typeof newValue.then === 'function'){
        newValue.then(resolve)
      }else{
        value = newValue
        state = 'fulfilled'
        // 使用setTimeout将callback放到下一轮事件循环执行
        setTimeout(function(){
          handlers.forEach(function(handler){
            handle(handler)
          })
        },0)
      }
    }catch(e){
      reject(e)
    }
  }

  function reject(reason){
    value = reason
    state = 'rejected'
    setTimeout(function(){
      handlers.forEach(function(handler){
        handle(handler)
      })
    }, 0)
  }

  fn(resolve,reject)
}
// 烧开水
let boilWater = (cb)=>{
  setTimeout(()=>{
    console.log('boilWater')
    cb && cb('boilWater')
  },10 * 1000)
}

// 洗杯子
let washGlass = (cb)=>{
  setTimeout(()=>{
    console.log('washGlass')
    cb && cb('washGlass')
  },2 * 1000)
}

// 准备茶叶
let prepareTeaLeaves = (cb)=>{
  setTimeout(()=>{
    console.log('prepareTeaLeaves')
    cb && cb('prepareTeaLeaves')
  },1 * 1000)
}


console.time('callback')
boilWater((boilWater)=>{
  washGlass((washGlass)=>{
    prepareTeaLeaves((prepareTeaLeaves)=>{
      console.log(boilWater + ' ' + washGlass + ' ' + prepareTeaLeaves)
      console.timeEnd('callback')
    })
  })
})



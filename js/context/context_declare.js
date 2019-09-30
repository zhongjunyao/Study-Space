// 1.进入 globalContext
VO(globalContext) = {
  test:,
  a:undefined,
}

// 2.执行 globalContext
VO(globalContext) = {
  test:function(x){},
  a:10,
}

// 3.进入 test functionContext
VO(test functionContext) ={
  x:undefined,
  b:undefined,
}

// 2.执行 test functionContext
VO(test functionContext) ={
  x:30,
  b:20
}
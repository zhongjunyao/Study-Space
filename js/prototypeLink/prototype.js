var a = {
  x:10,
  calculate:function(z){
    return this.x+this.y+z
  }
}

// 原型继承(委托继承)

// 写法一
var b = {
  y:20,
  __proto__:a
}
var c = {
  y:30,
  __proto__:a
}
console.log(b.calculate(1)) // 31
console.log(c.calculate(2)) // 42

// 写法二
var d = Object.create(a,{
  y:{
    value:20
  }
})
var e = Object.create(a,{
  y:{
    value:30
  }
})

console.log(d.calculate(1)) // 31
console.log(e.calculate(2)) // 42
console.log(a.__proto__.__proto__) // null
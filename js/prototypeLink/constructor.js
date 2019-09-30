function Foo(y){
  this.y = y
}

// 坑点1, 直接将新的对象赋值给原型,会改变原型
// Foo.prototype = {
//   x:10,
//   calculate:function(z){
//     return this.x+this.y+z
//   }
// }
// 解决方式，可采用混入的方式书写
// Foo.prototype = Object.assign(Foo.prototype,{
//   x:10,
//   calculate:function(z){
//     return this.x+this.y+z
//   }
// })

// inherited property "x"
Foo.prototype.x = 10;
 
// and inherited method "calculate"
Foo.prototype.calculate = function (z) {
  return this.x + this.y + z;
};

var fooObj = new Foo(10)
console.log(fooObj) // { y:10 }
console.log(fooObj.calculate(1)) // 21


var b = new Foo(20)
var c = new Foo(30)

console.log(
  b.__proto__ === Foo.prototype,  // true
  c.__proto__ === Foo.prototype,  // true

  b.constructor === Foo, // true
  c.constructor === Foo, // true
  Foo.prototype.constructor === Foo, // true

  b.calculate === b.__proto__.calculate, // true

  b.__proto__.calculate === Foo.prototype.calculate // true

)
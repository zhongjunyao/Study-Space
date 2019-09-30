var foo = 10

function bar(){}

(function baz(){})

console.log(
  this.foo === foo, // true

  window.bar == bar // true
)

console.log(baz);  //  ReferenceError, "baz" is not defined
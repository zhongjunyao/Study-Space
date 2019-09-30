// 1.执行栈
function test(a, b) {
  var c = 10;
  function d() {}
  var e = function _e() {};
  (function x() {});
}

test(10); // call


ECStack = [
  funtionContext,
  globalContext
];

// 递归激活foo函数
ECStack = [
  functionContext - recursively,
  functionContext,
  globalContext
];


// 2.描述
eval('var x = 10');
(function foo(){
    eval(' var y = 20 ');
})();
alert(x); // 10
alert(y); // ”y” is not defined

ECStack = [
  globalContext
];
// eval('var x = 10');
ECStack.push(
  evalContext,
  callingContext:globalContext
);
// return from eval
ECStack.pop();
// foo function call
ECStack.push(functionContext);

// eval(' var y = 20 ');
ECStack.push(
  evalContext,
  callingContext:functionContext
);
// return from eval
ECStack.pop();
// return from foo
ECStack.pop();


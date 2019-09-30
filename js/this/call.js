Function.prototype.call2 = function(context){
  context = context || window;
  context._callFn = this; // this就是函数
  var _args = []
  for(var i=0, len=arguments.length; i<len; i++){
    _args.push('arguments[' + i + ']')
  }
  // 将数组里的元素作为多个参数放进函数的形参里
  var result = eval('context._callFn(' + _args + ')')
  delete context._callFn;
  return result;
}

var teacher = 'Global Song';
var foo = {
  teacher: 'Song'
};

function learn(subject,content) {
  console.log(this.teacher,subject,content);
}

learn.call2(foo,"前端","call函数")
learn.call2(null)
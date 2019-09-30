Function.prototype.call2 = function(context,array){
  context = context || window;
  context._callFn = this; // this就是函数

  var result;
  if(!array){
    result = context._callFn()
  }else{
    var _args = []
    for(var i=0, len=array.length; i<len; i++){
      _args.push('array[' + i + ']')
    }
    // 将数组里的元素作为多个参数放进函数的形参里
    result = eval('context._callFn(' + _args + ')')
  }
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

learn.call2(foo,["前端","call函数"])
learn.call2(null)
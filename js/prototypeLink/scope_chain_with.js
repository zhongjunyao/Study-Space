function f(foo, values) {
  with (foo) {
      console.log(values)
  }
}

f([1,2,3], {a:1})
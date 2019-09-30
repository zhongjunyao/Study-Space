
let aObj = {
  name:'zjy',
  sex:'男'
}

Object.defineProperty(aObj,'age',{
  enumerable:false,
  configurable:true,
  value:18,
})

console.log(aObj)
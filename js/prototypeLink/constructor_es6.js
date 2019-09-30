
class Foo{
  constructor(name){
    this._name = name
  }

  getName(){
    return this._name
  }

}

class Bar extends Foo{
  constructor(name){
    super(name)
  }
}
console.log(new Bar('zjy').getName())
var person = {
  getName: function(){
    return this.name;
  }
}
var person1 = {
  name:'jack'
}
Function.prototype.myApply = function (context){
  if(typeof this !== 'function'){
    throw new Error('error:notfunction');
  }
  context = context||window;
  context.fn = this;
  let result;
  if(arguments[1]){
    result = context.fn(...arguments[1]);
  }else{
    result = context.fn();
  }
  delete context.fn
  return result;
}
console.log(person.getName.myApply(person1,1,2,3));
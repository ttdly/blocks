var person = {
  getName: function(){
    return this.name;
  }
}
var person1 = {
  name:'jack'
}
Function.prototype.myCall = function (context){
  if(typeof this !== 'function'){
    throw new Error('error:not Function');
  }
  context = context||window;
  let args = [...arguments].slice(1);
  context.fn = this;
  let result = context.fn(...args);
  return result;
}
console.log(person.getName.myCall(person1,1,2,3));
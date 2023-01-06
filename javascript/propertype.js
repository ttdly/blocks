// 父类
function Parent(){
  this.name = ['jack']
}
Parent.prototype.getName = function ()  {
  return this.name;
}
// 子类
// 原型链继承
// 子类原型指向父类实例
function Child(){}
Child.prototype = new Parent();

const child = new Child();

console.log( child.name ); // [ 'jack' ]
console.log( child.getName() ); // [ 'jack' ]

const child2 = new Child();
child2.name[0] = 'jane';

console.log( child2.name ); // [ 'jane' ]
console.log( child.name ); // [ 'jane' ]

// 构造函数继承
// 在子类的构造函数中 执行父类的构造函数 并为其绑定子类的this

function Animals( name ){
  this.name = [name];
}

Animals.prototype.getName = function(){
  return this.name;
}

function Dog(){
  Animals.call( this, '田园' ); // 改变this指向
}

const dog1 = new Dog();
const dog2 = new Dog();

dog1.name[0] = '贵妃';
console.log( dog1 ); // Dog { name: [ '贵妃' ] }
console.log( dog2 ); // Dog { name: [ '田园' ] }
// 但是它继承不了父类原型链上的方法和属性


// 组合式继承

function Car ( name ) {
  this.name = [name];
}

Car.prototype.getName = function(){
  return this.name;
}


function Bus ( name ){
  Car.call( this, name );
}

Bus.prototype = new Car(); // 每次new子类都会new父类
/**寄生继承
 * Bus.prototype = Object.create( Car.prototype );
 * Bus.prototype.constructor = Bus;
 * Bus.prototype.getBus = function(){} //只有深拷贝这里才不会作用到父类的原型链上去
 */
const bus1 = new Bus('bus1');
const bus2 = new Bus('bus2');

console.log( bus1.getName() ); // [ 'bus1' ]
console.log( bus2.getName() ); // [ 'bus2' ]
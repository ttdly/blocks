// 一般数据类型 number string boolean null undefined Symbol
// 特殊数据类型 object Array Set Map
let num = 123;
let person = {
    name: 'jack',
    hobby: [ 'basketball', 'baseball', 'football' ] ,
}
let person1 = person;

person1.name = 'jane';
console.log(person1.name); // jane
console.log(person.name); // jane
// 以上过程是赋值，并不是浅拷贝

// 浅拷贝必须是创建了新的对象

function shallowClone(source) {
    let newObj = {};
    for( let i in source ) {
        if( source.hasOwnProperty(i) ){
            newObj[i] = source[i];
        }
    }
    return newObj
}

// 对一般类型的浅拷贝[拷贝的是基本类型数据]
person1 = shallowClone( person );
person1.name = 'jane';
console.log(person1.name); // jane
console.log(person.name); // jack

// 对引用数据类型拷贝[拷贝的是内存地址，会互相影响]
person1.hobby[1] = 'ball';
console.log( person1.hobby[1] ); // ball
console.log( person.hobby[1] ); // ball

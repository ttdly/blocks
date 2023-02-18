// 利用Proxy实现表单验证
const validators = {
  name: {
    validate ( value ) {
      return value.length > 6;
    },
    message: '用户名长度不能小于6',
  },
  password: {
    validate ( value ) {
      return value.length > 10;
    },
    message: '密码长度不能小于10',
  },
  mobile: {
    validate ( value ) {
      return /^1(3|5|7|8|9)[0-9]{9}$/.test( value );
    },
    message: '手机号格式不正确',
  }
}

function validator( obj, validators ){
  return new Proxy( obj, {
    set( traget, key, value ) {
      const validator = validators[key];
      if( !validator ) {
        traget[key] = value;
      } else if ( validator.validate(value) ){
        traget[key] = value;
      } else {
        alert( validator.message || 'Unknown Error' );
      }
    }
  } )
}

let form = {};
form = validator( form, validators );
form.name = 'jane'; // 用户名长度不能小于6

// get进行私有属性拦截
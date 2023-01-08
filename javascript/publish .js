// 发布者
// list存放函数
const publish = {
  list: [],
};

// 增加订阅者
publish.subscribe = function (key, fn) {
  if(!this.list[key]) {
    this.list[key] = [];
  }
  publish.list[key].push(fn);
  console.log(publish)
};

publish.trigger = function () {
  let key = Array.prototype.shift.call(arguments);
  let fns = this.list[key];
  if (!fns || fns.length === 0) return;
  for (let i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments);
  }
};

publish.subscribe('info1', function (var1) {
  console.log('subscribe1', var1);
})
publish.subscribe('info2', function (var1) {
  console.log('subscribe2', var1);
})

publish.trigger('info1', '爱莉希雅死了');
publish.trigger('info2', '凯文死了');


// 移除订阅

publish.remove = function (key, fn) {
  let fns = this.list[key];
  if (!fns) return false;
  if (!fn) {
    fns && (fns.length = 0);
  } else {
    for (let i = fns.length - 1; i >= 0; i--) {
      let _fn = fns[i];
      if (_fn === fn) {
        fns.splish(i, 1);
      }
    }
  }

}
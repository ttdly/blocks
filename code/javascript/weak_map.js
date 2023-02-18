const wm = new WeakMap();

class Class1{
  constructor(id) {
    this.idProperty = Symbol('id');
    this.setId(id);
  }

  setPrivate(property, value) {
    const privateMembers = wm.get(this) || {};
    privateMembers[property] = value;
    wm.set(this, privateMembers);
  }

  getPrivate(property) {
    return wm.get(this)[property];
  }

  setId(id) {
    this.setPrivate(this.idProperty, id);
  }

  getId() {
    return this.getPrivate(this.idProperty);
  }
}

const class1 = new Class1(123);
console.log(class1.getId());
class1.setId(456);
console.log(class1.getId());
console.log(wm.get(class1)[class1.idProperty]);
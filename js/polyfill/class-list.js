// Adapted from: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca

function regExp(name) {
  return new RegExp(`\b${name}\b`);
}

// class list object with basic methods
class ClassList {
  add(...args) {
    for (let name of args) {
      if (!this.contains(name)) {
        this.element.className += this.element.className.length > 0 ? ' ' + name : name;
      }
    }
  }

  constructor(element) {
    this.element = element;
  }

  contains(name) {
    return regExp(name).test(this.element.className);
  }

  remove(...args) {
    for (let name of args) {
      this.element.className = this.element.className.replace(regExp(name), '');
    }
  }

  toggle(name) {
    return this.contains(name) ?
      (this.remove(name), false) :
      (this.add(name), true);
  }
}

// IE8/9, Safari
if (!('classList' in Element.prototype)) {
  Object.defineProperty(Element.prototype, 'classList', {
    get: function() {
      return new ClassList(this);
    }
  });
}

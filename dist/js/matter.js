(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Matter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (button) {
  var transitionEndHandler = function transitionEndHandler(event) {
    return button.removeChild(event.target);
  };

  function unpressHandler() {
    var ripples = button.querySelectorAll('.ripple');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = ripples[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var ripple = _step.value;

        ripple.classList.add('fading-out');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  button.addEventListener('transitionend', transitionEndHandler);
  button.addEventListener('webkitTransitionEnd', transitionEndHandler);
  button.addEventListener('mouseleave', unpressHandler);
  button.addEventListener('mouseup', unpressHandler);

  button.addEventListener('mousedown', function (event) {
    if (event.button !== 2) {
      var ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.height = button.offsetWidth * 2 + 'px';
      ripple.style.top = event.pageY - this.offsetTop - button.offsetWidth + 'px';
      ripple.style.left = event.pageX - this.offsetLeft - button.offsetWidth + 'px';

      button.appendChild(ripple);
    }
  });
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initComponents = initComponents;

require('./polyfill');

var _buttons = require('./buttons');

var _buttons2 = _interopRequireDefault(_buttons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initComponents(parentNode) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = parentNode.querySelectorAll('[class$="-btn"]')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var button = _step.value;

      (0, _buttons2.default)(button);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

},{"./buttons":1,"./polyfill":3}],3:[function(require,module,exports){
'use strict';

require('./polyfill/class-list');

require('./polyfill/add-or-remove-event-listener');

},{"./polyfill/add-or-remove-event-listener":4,"./polyfill/class-list":5}],4:[function(require,module,exports){
"use strict";

if (!Element.prototype.addEventListener) {
  var runListeners = function runListeners(oEvent) {
    if (!oEvent) {
      oEvent = window.event;
    }

    for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) {
          oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent);
        }
        break;
      }
    }
  };

  var oListeners = {};

  Element.prototype.addEventListener = function (sEventType, fListener) {
    if (oListeners.hasOwnProperty(sEventType)) {
      var oEvtListeners = oListeners[sEventType];

      for (var _nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
        if (oEvtListeners.aEls[iElId] === this) {
          _nElIdx = iElId;
          break;
        }
      }

      if (nElIdx === -1) {
        oEvtListeners.aEls.push(this);
        oEvtListeners.aEvts.push([fListener]);
        this["on" + sEventType] = runListeners;
      } else {
        var aElListeners = oEvtListeners.aEvts[nElIdx];

        if (this["on" + sEventType] !== runListeners) {
          aElListeners.splice(0);
          this["on" + sEventType] = runListeners;
        }

        for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
          if (aElListeners[iLstId] === fListener) {
            return;
          }
        }

        aElListeners.push(fListener);
      }
    } else {
      oListeners[sEventType] = { aEls: [this], aEvts: [[fListener]] };
      this["on" + sEventType] = runListeners;
    }
  };

  Element.prototype.removeEventListener = function (sEventType, fListener) {
    if (!oListeners.hasOwnProperty(sEventType)) {
      return;
    }

    var oEvtListeners = oListeners[sEventType];

    for (var _nElIdx2 = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        _nElIdx2 = iElId;
        break;
      }
    }

    if (nElIdx === -1) {
      return;
    }

    for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
      if (aElListeners[iLstId] === fListener) {
        aElListeners.splice(iLstId, 1);
      }
    }
  };
}

},{}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Adapted from: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca

function regExp(name) {
  return new RegExp('\b' + name + '\b');
}

// class list object with basic methods

var ClassList = function () {
  _createClass(ClassList, [{
    key: 'add',
    value: function add() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;

          if (!this.contains(name)) {
            this.element.className += this.element.className.length > 0 ? ' ' + name : name;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  function ClassList(element) {
    _classCallCheck(this, ClassList);

    this.element = element;
  }

  _createClass(ClassList, [{
    key: 'contains',
    value: function contains(name) {
      return regExp(name).test(this.element.className);
    }
  }, {
    key: 'remove',
    value: function remove() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = args[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var name = _step2.value;

          this.element.className = this.element.className.replace(regExp(name), '');
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'toggle',
    value: function toggle(name) {
      return this.contains(name) ? (this.remove(name), false) : (this.add(name), true);
    }
  }]);

  return ClassList;
}();

// IE8/9, Safari


if (!('classList' in Element.prototype)) {
  Object.defineProperty(Element.prototype, 'classList', {
    get: function get() {
      return new ClassList(this);
    }
  });
}

},{}]},{},[2])(2)
});
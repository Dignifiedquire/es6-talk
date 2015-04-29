'use strict';

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var _taggedTemplateLiteral = function (strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// Syntactic Sugar
// ===============

var fs = require('fs');
var log = console.log.bind(console);

// Destructering
// -------------

function destructering() {
  // List Matching
  var toys = ['car', 'pc', 'laptop', 'doll'];
  var first = toys[0];
  var third = toys[2];

  log('My first toy is %s', first);
  log('My third toy is %s', third);

  // Object Matching
  var toyDescriptions = {
    car: { value: 100 },
    pc: { value: 2000 },
    laptop: { value: 600 },
    doll: { value: 40 }
  };

  var value = toyDescriptions.pc.value;

  log('The value of the pc is $%s.', value);

  // Object Matching in function parameters
  function logValue(name, _ref) {
    var value = _ref.value;

    log('The value of the %s is $%s.', name, value);
  }

  logValue('laptop', toyDescriptions.laptop);

  // Fail-soft destructering with defaults
  var _ref2 = [];
  var _ref2$0 = _ref2[0];
  var a = _ref2$0 === undefined ? 'toy' : _ref2$0;

  log(a === 'toy');
}

destructering();

// Classes
// -------

var Toy = (function () {
  function Toy(name) {
    _classCallCheck(this, Toy);

    this.name = name;
  }

  _createClass(Toy, [{
    key: 'hello',
    value: function hello() {
      log(this.name);
    }
  }], [{
    key: 'defaultToy',
    value: function defaultToy() {
      return new Toy('default');
    }
  }]);

  return Toy;
})();

var SpecialToy = (function (_Toy) {
  function SpecialToy(name, value) {
    _classCallCheck(this, SpecialToy);

    _get(Object.getPrototypeOf(SpecialToy.prototype), 'constructor', this).call(this, name);

    this.value = value;
  }

  _inherits(SpecialToy, _Toy);

  _createClass(SpecialToy, [{
    key: 'hello',
    value: function hello() {
      _get(Object.getPrototypeOf(SpecialToy.prototype), 'hello', this).call(this);
      log('My value is %s', this.value);
    }
  }]);

  return SpecialToy;
})(Toy);

function classes() {
  var toy = new Toy('Car');
  toy.hello();

  var defaultToy = Toy.defaultToy();
  defaultToy.hello();

  var sToy = new SpecialToy('PC', 2000);
  sToy.hello();
}

classes();

// Enhanced Object Literals
// ------------------------

function literals() {
  var _obj, _obj2;

  var myProp = 'prop';
  var secret = '123';
  var obj = _obj = (_obj2 = {}, _defineProperty(_obj2, myProp + '1', 1), _defineProperty(_obj2, myProp + '2', 2), _defineProperty(_obj2, 'hello', function hello() {
    log('hello');
  }), _defineProperty(_obj2, 'toString', function toString() {
    return 'fancy' + _get(Object.getPrototypeOf(_obj), 'toString', this).call(this);
  }), _defineProperty(_obj2, 'secret', secret), _obj2);

  log(obj.prop1);
  log(obj.prop2);
  log('' + obj);
  obj.hello();
}

literals();

// Parameter default values
// ------------------------

function defaults() {
  function hello(a) {
    var b = arguments[1] === undefined ? 'Mr.' : arguments[1];

    log(a + ' ' + b);
  }

  hello('hi');
  hello('hi', 'Friedel');
}

defaults();

// Rest parameters
// ---------------

function rest() {
  function append(head) {
    for (var _len = arguments.length, tail = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      tail[_key - 1] = arguments[_key];
    }

    tail.forEach(function (elem) {
      head.push(elem);
    });

    return head;
  }

  log(append([], 1, 2, 3, 4, 5));
}

rest();

// Spread operator
// ---------------

function spread() {
  var myList = [1, 2, 3, 4];
  var empty = [];
  empty.push.apply(empty, myList);
  log(empty);
}

spread();

// Arrow functions
// ---------------

function arrow() {
  var Simple = (function () {
    function Simple() {
      _classCallCheck(this, Simple);
    }

    _createClass(Simple, [{
      key: 'read',
      value: function read(file, done) {
        var _this5 = this;

        fs.readFile(file, function (err, res) {
          // this still refers to the instance of Simple
          _this5.res = res.toString();
          done();
        });
      }
    }]);

    return Simple;
  })();

  var simple = new Simple();

  simple.read('es6.md', function () {
    log(simple.res.split('\n')[0]);
  });
}

arrow();

// Template Literals and Tagged Templates
// --------------------------------------

function templates() {
  log('1 + 1 = ' + (1 + 1));
  log('This\nis a multiline\nstring\n-----\n\nwith some fancy\nformat.');

  function TAG(strings) {
    for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      values[_key2 - 1] = arguments[_key2];
    }

    var clean = strings.map(function (s) {
      return s.replace(/(\r\n|\n|\r)\s*/gm, ' ').trim();
    });
    var res = '';

    clean.forEach(function (val, i) {
      res += val + (values[i] || '');
    });

    return res;
  }

  log(TAG(_taggedTemplateLiteral(['\n  A more interesting\n  way\n  of\n  removing\n  line breaks\n  (', ').\n  '], ['\n  A more interesting\n  way\n  of\n  removing\n  line breaks\n  (', ').\n  ']), 1 + 1));
}

templates();

// Binary and Octal Literals
// ----------------------------------

function literals() {
  var myBinary = 53;
  var myOctal = 503;

  log(myBinary);
  log(myOctal);
}

literals();

// computed property values

// Methods

// Super calls

// Shorthand
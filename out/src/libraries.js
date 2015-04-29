// Better Libraries
// ================

'use strict';

var log = console.log.bind(console);

// Promises
// --------

function promises() {
  function timeout() {
    var duration = arguments[0] === undefined ? 0 : arguments[0];

    return new Promise(function (resolve, reject) {
      setTimeout(resolve, duration);
    });
  }

  timeout(1000).then(function () {
    log('first timeout done');
    return timeout(2000);
  }).then(function () {
    log('throwin an error');
    throw new Error('hmm');
  })['catch'](function (err) {
    log('caught error', err);
    return Promise.all([timeout(100), timeout(200)]);
  }).then(function () {
    log('all done');
  });
}

promises();

// Object.assign
// -------------

function assign() {
  log(Object.assign({}, { hey: 1 }, { you: 2 }, { hey: 3 }));
}

assign();

// New String Methods
// ------------------

function string() {
  log('-'.repeat(12));
  log('Does "hello world" include "wo"? %s', 'hello world'.includes('wo'));
  log('-'.repeat(12));
}

string();

// New Array Methods
// -----------------

function array() {
  var toys = ['doll', 'car', 'laptop'];

  log('The index of car is: %s.', toys.findIndex(function (x) {
    return x === 'car';
  }));

  log([1, 2, 3, 4].fill(7, 2));

  log('values', Array.from(toys.values()));
  log('keys', Array.from(toys.keys()));
  log('entries', Array.from(toys.entries()));
}

array();

// New Math Methods
// ----------------

function math() {
  log('Epsilon %s', Number.EPSILON);
  log('Is infinity an integer? %s', Number.isInteger(Infinity));
  log('Is "NaN" a NaN?', Number.isNaN('NaN'));

  log('Hyperbolic arccosine of 3: %s', Math.acosh(3));
}

math();
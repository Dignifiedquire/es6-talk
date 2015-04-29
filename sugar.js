// Syntactic Sugar
// ===============

const fs = require('fs')
const log = console.log.bind(console)

// Destructering
// -------------

function destructering() {
  // List Matching
  const toys = ['car', 'pc', 'laptop', 'doll']
  const [first, , third] = toys

  log('My first toy is %s', first)
  log('My third toy is %s', third)

  // Object Matching
  const toyDescriptions = {
    car: {value: 100},
    pc: {value: 2000},
    laptop: {value: 600},
    doll: {value: 40}
  }

  const {pc: {value}} = toyDescriptions

  log('The value of the pc is $%s.', value)

  // Object Matching in function parameters
  function logValue(name, {value}) {
    log('The value of the %s is $%s.', name, value)
  }

  logValue('laptop', toyDescriptions.laptop)

  // Fail-soft destructering with defaults
  const [a = 'toy'] = []
  log(a === 'toy')
}

destructering()

// Classes
// -------

class Toy {
  constructor(name) {
    this.name = name
  }

  hello() {
    log(this.name)
  }

  static defaultToy() {
    return new Toy('default')
  }
}

class SpecialToy extends Toy {
  constructor(name, value) {
    super(name)

    this.value = value
  }

  hello() {
    super.hello()
    log('My value is %s', this.value)
  }
}

function classes() {
  const toy = new Toy('Car')
  toy.hello()

  const defaultToy = Toy.defaultToy()
  defaultToy.hello()

  const sToy = new SpecialToy('PC', 2000)
  sToy.hello()
}

classes()

// Enhanced Object Literals
// ------------------------


function literals() {
  const  myProp = 'prop'
  const secret = '123'
  const obj = {
    // computed property values
    [myProp + '1']: 1,
    [myProp + '2']: 2,

    // Methods
    hello() {
      log('hello')
    },

    // Super calls
    toString() {
      return 'fancy' + super.toString()
    },

    // Shorthand
    secret
  }

  log(obj.prop1)
  log(obj.prop2)
  log('' + obj)
  obj.hello()
}

literals()

// Parameter default values
// ------------------------

function defaults() {
  function hello(a, b = 'Mr.') {
    log(a + ' ' + b)
  }

  hello('hi')
  hello('hi', 'Friedel')
}

defaults()

// Rest parameters
// ---------------

function rest() {
  function append(head, ...tail) {
    tail.forEach(function(elem) {
      head.push(elem)
    })

    return head
  }

  log(append([], 1, 2, 3, 4, 5))
}

rest()

// Spread operator
// ---------------

function spread() {
  const myList = [1, 2, 3, 4]
  const empty = []
  empty.push(...myList)
  log(empty)
}

spread()

// Arrow functions
// ---------------

function arrow() {

  class Simple {
    read(file, done) {
      fs.readFile(file, (err, res) => {
        // this still refers to the instance of Simple
        this.res = res.toString()
        done()
      })
    }
  }

  const simple = new Simple()

  simple.read('es6.md', () => {
    log(simple.res.split('\n')[0])
  })
}

arrow()

// Template Literals and Tagged Templates
// --------------------------------------

function templates() {
  log(`1 + 1 = ${1 + 1}`)
  log(`This
is a multiline
string
-----

with some fancy
format.`)

  function TAG(strings, ...values) {
    const clean = strings.map(s => {
      return s.replace(/(\r\n|\n|\r)\s*/gm, ' ').trim()
    })
    let res = ''

    clean.forEach((val, i) => {
      res += val + (values[i] || '')
    })

    return res
  }

  log(TAG`
  A more interesting
  way
  of
  removing
  line breaks
  (${1 + 1}).
  `)
}

templates()

// Binary and Octal Literals
// ----------------------------------


function literals() {
  const myBinary = 0b110101
  const myOctal = 0o767

  log(myBinary)
  log(myOctal)
}

literals()

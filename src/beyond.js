// Beyond
// ======

const log = console.log.bind(console)

// Class Properties (S0)
// ---------------------

function props() {
  class Cool {
    color = 'red'

    constructor(color) {
      if (color) {
        this.color = color
      }
    }

    boundColor = () => this.color
    unboundColor() {
      return this.color
    }
  }

  const cool = new Cool()
  log(cool.color)
  log(cool.boundColor.call({color: 'green'}))
  log(cool.unboundColor.call({color: 'green'}))
}

props()

// Decorators (S1)
// ---------------
function decorators() {
  function isTestable(value) {
    return function decorator(target) {
      target.prototype.isTestable = value
    }
  }

  @isTestable(true)
  class TestClass {}

  const cls = new TestClass()

  log('Is my class testable? %s.', cls.isTestable)
}

decorators()

// Object rest and spread (S1)
// ---------------------------

function objectSpread() {
  const toys = {car: 5000, doll: 100}
  log({pc: 2000, ...toys})
}

objectSpread()

// Exponentiation operator (S2)
// ----------------------------

function exp() {
  log(`10^2 is ${10**2}`)
}

exp()

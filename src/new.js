// Completely New
// ==============

const log = console.log.bind(console)

// Weak?(Map|Set)
// -------------

function weak() {
  // Set
  const s = new Set()
  s.add('first').add('second').add('first')

  log(s.size)
  log(s.has('second'))
  log(Array.from(s))

  // Map
  const m = new Map()
  m.set('first', 42)
  m.set(s, s.size)
  log(Array.from(m))

  log('The size of s is %s.', m.get(s))

  // Weak Set
  const ws = new WeakSet()
  ws.add({data: 42})
  log('Size of the weak set: %s', ws.size)

  // Weak Map
  const wm = new WeakMap()
  wm.set(s, {secret: '123'})
  log('Size of the weak map: %s', wm.size)
}

weak()

// Symbols
// -------

function symbols() {
  const Hideout = (function () {
    // Secret symbol
    const secret = Symbol('123')

    function Hideout(data) {
      this[secret] = data
    }

    Hideout.prototype.showSecret = function () {
      log(this[secret])
    }

    return Hideout
  })()

  const hideout = new Hideout('my dark secret')
  log(hideout['123'])
  hideout.showSecret()
}

symbols()

// Iterators and for .. of
// -----------------------

function iterators() {
  let fibonacci = {
    [Symbol.iterator]() {
      let pre = 0
      let cur = 1

      return {
        next() {
          [pre, cur] = [cur, pre + cur]
          return {
            done: false,
            value: cur
          }
        }
      }
    }
  }
  let res = []
  for (let n of fibonacci) {
    if (n > 1000) break
    res.push(n)
  }
  log(res)


  // Iterator Interface
  //
  // interface IteratorResult {
  //   done: boolean;
  //   value: any;
  // }
  // interface Iterator {
  //   next(): IteratorResult;
  // }
  // interface Iterable {
  //   [Symbol.iterator](): Iterator
  // }
}

iterators()

// Generators
// ----------

function generators() {
  function* objectEntries(obj) {
    for (let key of Object.keys(obj)) {
      yield [key, obj[key]]
    }
  }

  const toys = {car: 100, pc: 2000, laptop: 500}
  const it = objectEntries(toys)

  log(it.next())
  log(it.next())
  log(it.next())
  log(it.next())

  for (let [key, value] of objectEntries(toys)) {
    log('The value of %s is $%s.', key, value)
  }
}

generators()

// Tail Call Optimizations
// -----------------------

function tail() {
  function factorial(n, acc = 1) {
    if (n <= 1) return acc
    return factorial(n - 1, n * acc)
  }

  // Stack overflow in most implementations today,
  // but safe on arbitrary inputs in eS6
  log(factorial(100000))
}

tail()

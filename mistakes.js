// Fix old Mistakes
// ================

// Block-Scoped Variables
// ----------------------


function hello() {
  {
    let x = 'original'

    {
      const x = 'i shadow you'
      console.log(x)
    }

    x = 'redeclare'
    console.log(x)
  }

  // all good, outside of the block
  let x = 'something'

  console.log(x)
}

hello()

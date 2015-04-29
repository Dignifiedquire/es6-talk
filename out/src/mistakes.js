// Fix old Mistakes
// ================

// Block-Scoped Variables
// ----------------------

'use strict';

function hello() {
  {
    var _x = 'original';

    {
      var _x2 = 'i shadow you';
      console.log(_x2);
    }

    _x = 'redeclare';
    console.log(_x);
  }

  // all good, outside of the block
  var x = 'something';

  console.log(x);
}

hello();
#! /usr/bin/env node

const path = require('path');
const lib = require(path.join(__dirname, '..', 'lib'));

if (process.argv[2] == 'market') {
  lib.get_market_data((error,json) => {
    if (error) console.err(error); else console.log(json);
  });
} else {
  lib.do_for_symbol(process.argv[2], process.argv[3], (error, json) => {
    if (error) console.err(error); else console.log(json);
  });
}

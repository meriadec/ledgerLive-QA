const expected = require('./src/expected_app.json');
const actual = require('./src/synced_app.json');

let compareJSON = function(expected, actual) {
  var ret = {};
  for(var i in actual) {
    if(!expected.hasOwnProperty(i) || actual[i] !== expected[i]) {
      ret[i] = actual[i];
    }
  }
  return ret;
};

alert(JSON.stringify(compareJSON(a, b)));

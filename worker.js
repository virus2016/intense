var Q = require('q');

process.on('message', function(m) {
  var fn = require('./' + m.function);
  if (typeof fn === 'function') {
    process.send(fn(m.data));
  }
});

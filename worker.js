process.on('message', function(m) {
  try {
    var fn = require('./' + m.function);
    if (typeof fn === 'function') {
      process.send({
        err: undefined,
        result: fn(m.data)
      });
    }
  } catch (e) {
    process.send({
      err: 'can not find function'
    });
  } finally {

  }

});

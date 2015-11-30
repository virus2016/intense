var cp = require('child_process');
var child = cp.fork('./worker');

child.on('message', function(m) {
  console.log(m);
});

child.send({
  function: 'upperCase.test',
  data: 'testing'
});

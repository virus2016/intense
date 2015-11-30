var cp = require('child_process');
var Q = require('q');
var Deque = require('double-ended-queue');
var doWhile = require('dank-do-while');
var deque = new Deque();

var workersLimit = 4;
var workers = 0;
var timeCheck = 2500;
var workInterval;

function queueJob(job) {
  var deferred = Q.defer();

  deque.push({
    promise: deferred,
    job: job
  });

  doWork();

  return deferred.promise;

}

function doWork() {
  clearInterval(workInterval);
  workInterval = setInterval(function() {
    //console.log(timeCheck)
    for (i = workers; i < workersLimit; i++) {
      if (!deque.isEmpty()) {
        createWorker(deque.shift());
      }
    }
  }, timeCheck);
}

function createWorker(config) {
  workers += 1;
  var child = cp.fork('./worker');
  var time = {
    started: (new Date).getTime()
  };

  child.on('message', function(response) {
    time.ended = (new Date).getTime();
    response.took = time.ended - time.started;
    timeCheck = response.took;
    doWork();
    if (response.err) {
      config.promise.reject(response.err);
    } else {
      config.promise.resolve(response.result);
    }
    child.kill();
    workers -= 1;
  });

  child.send(config.job);
}

//////////////////////// TEST

// for (var i = 0; i < 100; i++) {
//
//   queueJob({
//       function: 'upperCase.test',
//       data: 'testing' + i
//     })
//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
//
//   //console.log(i)
//
// }

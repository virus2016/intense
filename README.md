#### STILL IN DEVELOPMENT

# Intense
Create CPU intensive functions without bothering the event loop.

## Before getting started, why?

Node is amazing, we all know this. The problem has been where the event loop gets blocked when you need to do some CPU intense stuff. If you did all the hard work inside one Node process that process would eventually block causing the process to grind to a complete halt.

Intense is great with web services such as Express, socket.io etc to offload work from the main Node process to a child process enabling your awesome application to respond in good time.

## Getting started

All you need to do is create a job. We use the promise structure so it is very easy to keep track of your workers

```javascript
var intense = require('intense');

intense({
    function: 'upperCase.test',
    data: 'testing' + i
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
```

#### Please help!

If you find a better way or you just want to contribute, please feel free to make a pull request.

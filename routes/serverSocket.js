var display_names = {};
var numUsers = 0;

let __clientId = 0;
var fn = function(socket) {
  var addedUser = false;
  console.log('new websocket connnection');

  __clientId++;
  let client = {
    id: __clientId,
    pool: pool.newSubscribePool()
  };

  socket.on('login', function (data) {
    console.log('login event:', data);
    socket.id = data.id;
    display_names[data.id] = data.name;
    ++numUsers;
    addedUser = true;
  });

  socket.on('disconnect', function () {
    wrap(account.logoutFactory(socket, client))();
  });

  function wrap(func) {
    console.log('wrap was call');
    return (...args) => {
      func.apply(this, args).then(null, err => {
        console.error('Error in function', func.name);
        console.error(err.stack);
      });
    };
  }


  //Meta
  // socket.on('GET meta/id', wrap(meta.readMetaFactory(socket, client)));
  // socket.on('POST meta', wrap(meta.createMetaFactory(socket, client)));
};

module.exports = fn;

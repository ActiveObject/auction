var http = require('http');
var app = require('express')();

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send({
    text: 'Hello, world 123'
  });
});

var server = http.createServer(app);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
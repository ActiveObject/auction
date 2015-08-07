var http = require('http');
var app = require('express')();
var cors = require('cors');

app.set('port', process.env.PORT || 3000);

app.use(cors());

app.get('/', function (req, res) {
  res.send({
    text: 'Hello, world 1234'
  });
});

var server = http.createServer(app);

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
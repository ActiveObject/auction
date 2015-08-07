var events = require('events');
var app = require('express')();
var cors = require('cors');
var bodyParser = require('body-parser');
var SSE = require('sse-emitter');
var bus = new events.EventEmitter();

var sse = new SSE({
  keepAlive: 30000
});

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(bodyParser.json());

app.post('/auctions/:id', function (req, res) {
  var bid = req.body;

  sse.emit(req.path + '/live-bids', bid);

  res.send({
    nextBid: {
      amount: bid.amount + 5000,
      currency: bid.currency
    }
  });
});

app.get('/auctions/:id/live-bids', sse.bind());

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
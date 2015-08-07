var events = require('events');
var app = require('express')();
var cors = require('cors');
var bodyParser = require('body-parser');
var SSE = require('sse-emitter');
var bus = new events.EventEmitter();

var sse = new SSE({
  keepAlive: 60 * 60 * 1000
});

var auctionDb = [{
  id: 1,
  lot: {
    name: 'Mercedes Benz 300 ‘Adenauer’ Convertible Conversion, 1953',
    desc: 'For this auction, we have assembled a very special selection of chronographs that will entice both new and experienced collectors. Watch lovers can look forward to rare highlights such as a Breitling Premier Chronograph, Ref. 734, and a stylish HY Moser & Cie single button chronograph. With its wide range of manufactures and some remarkable entry prices, this auction presents a unique opportunity for all aficionados of fine timepieces.',
    picture: {
      width: 460,
      height: 340,
      href: 'pictures/210518-0028-h.jpg'
    }
  },

  bids: [],
  nextBid: {
    amount: 40000,
    currency: 'EUR'
  }
}];

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(bodyParser.json());

app.get('/auctions/:id', function (req, res) {
  var auction = auctionDb.filter(function (auction) {
    return String(auction.id) === req.params.id;
  })[0];

  if (!auction) {
    return res.send(404);
  }

  res.send(auction);
});

app.post('/auctions/:id', function (req, res) {
  var bid = req.body;
  var nextBid = {
    amount: bid.amount + 5000,
    currency: bid.currency
  };

  var auction = auctionDb.filter(function (auction) {
    return String(auction.id) === req.params.id;
  })[0];

  if (!auction) {
    return res.status(401).send({
      message: 'Unknown auction with id ' + req.params.id
    });
  }

  auction.nextBid = nextBid;
  auction.bids.push(bid);

  sse.emit(req.path + '/live-bids', {
    bid: bid,
    nextBid: nextBid
  });

  res.send({ nextBid: nextBid });
});

app.get('/auctions/:id/live-bids', sse.bind());

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
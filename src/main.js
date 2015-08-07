import { EventEmitter } from 'events'
import React from 'react'
import Atom from 'app/Atom'
import merge from 'app/merge'
import 'app/styles/main.css'

function highestBid(auction) {
  if (!isStarted(auction)) {
    throw new Error('Auction should be started to get a highest bid');
  }

  return auction.bids[auction.bids.length - 1];
}

function isStarted(auction) {
  return auction.bids.length > 0;
}

function render() {
  React.render(React.createElement(AuctionRoom), document.getElementById('app'));
}

var fakeServer = new EventEmitter();

/**
 * POST /auctions/{auctionId}
 */
function sendNewBid(auctionId, bid) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve({
        nextBid: {
          amount: bid.amount + 5000,
          currency: bid.currency
        }
      });

      setTimeout(function () {
        fakeServer.emit('res', {
          bid: bid
        })
      }, 1000);
    }, 1000);
  });
}

/**
 * GET /auctions/{auctionId}/live-bids
 * Assume that server uses SSE to notify browser about changes.
 */
function listenAuctionBids(auction) {
  var stream = new EventEmitter();

  fakeServer.on('res', function (res) {
    stream.emit('bid', res.bid);
  });

  return stream;
}

var db = new Atom({
  auction: {
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
  }
});

var Lot = React.createClass({
  render: function () {
    var { href, width, height } = this.props.value.picture;

    return (
      <div className='lot'>
        <h2 className='lot__name'>{this.props.value.name}</h2>
        <div>
          <img className='lot__picture' width={width} height={height} src={href} />
        </div>
        <div className='lot__desc'>{this.props.value.desc}</div>
      </div>
    )
  }
});

var Bid = React.createClass({
  render: function () {
    return (
      <span className='bid'>{this.props.value.amount + ' ' + this.props.value.currency}</span>
    )
  }
})

var BidBtn = React.createClass({
  render: function () {
    return (
      <button className='bidbtn' onClick={this.props.onClick} >
        <span>Commit to bid</span> <Bid value={this.props.bid} />
      </button>
    )
  }
});

var HighestBid = React.createClass({
  render: function () {
    return (
      <div className='highest-bid'>
        <span className='highest-bid__name'>{this.props.bid.user}</span> <Bid value={this.props.bid} />
      </div>
    )
  }
});

var AuctionStatus = React.createClass({
  render: function () {
    if (isStarted(this.props.auction)) {
      return (
        <div className='auction-status'>
          <HighestBid bid={highestBid(this.props.auction)} />
        </div>
      )
    }

    return <div className='auction-status'></div>;
  }
})

var AuctionRoom = React.createClass({
  componentDidMount: function () {
    this.stream = listenAuctionBids(db.value.auction);
    this.stream.on('bid', function (bid) {
      Atom.update(db, function (appstate) {
        var { auction } = appstate;

        return merge(appstate, {
          auction: merge(auction, {
            bids: auction.bids.concat(bid)
          })
        });
      });
    });
  },

  componendWillUnmount: function () {
    this.stream.removeAllListeners();
  },

  render: function () {
    var auction = db.value.auction;

    return (
      <div className='auction-room'>
        <div className='auction-room__row'>
          <Lot value={auction.lot} />
        </div>

        <div className='auction-room__row'>
          <BidBtn bid={auction.nextBid} onClick={() => this.sendNewBid(auction)} />
          <AuctionStatus auction={auction} />
        </div>
      </div>
    )
  },

  sendNewBid: function (auction) {
    sendNewBid(auction.id, {
      user: 'Richard Branson',
      amount: auction.nextBid.amount,
      currency: auction.nextBid.currency
    })
      .then(function (result) {
        Atom.update(db, function (appstate) {
          return merge(appstate, {
            auction: merge(appstate.auction, {
              nextBid: result.nextBid
            })
          })
        })
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});

Atom.listen(db, render);
render(db.value);

import React from 'react'
import db from 'app/db'
import Atom from 'app/Atom'
import merge from 'app/merge'
import { highestBid, isStarted, sendNewBid, listenAuctionBids } from 'app/Auction'

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

export default React.createClass({
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
    var auction = this.props.auction;

    return (
      <div className='auction-room'>
        <div className='auction-room__row'>
          <Lot value={auction.lot} />
        </div>

        <div className='auction-room__row'>
          <BidBtn bid={auction.nextBid} onClick={this.sendNewBid} />
          <AuctionStatus auction={auction} />
        </div>
      </div>
    )
  },

  sendNewBid: function () {
    var auction = this.props.auction;
    var user = this.props.user;

    sendNewBid(auction.id, {
      user: user,
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
})
import React from 'react'
import 'app/styles/main.css'

function highestBid(auction) {
  return auction.bids[auction.bids.length - 1];
}

var auction = {
  lot: {
    name: 'Mercedes Benz 300 ‘Adenauer’ Convertible Conversion, 1953',
    desc: 'For this auction, we have assembled a very special selection of chronographs that will entice both new and experienced collectors. Watch lovers can look forward to rare highlights such as a Breitling Premier Chronograph, Ref. 734, and a stylish HY Moser & Cie single button chronograph. With its wide range of manufactures and some remarkable entry prices, this auction presents a unique opportunity for all aficionados of fine timepieces.',
    picture: {
      width: 460,
      height: 340,
      href: 'pictures/210518-0028-h.jpg'
    }
  },

  bids: [{
    user: 'Richard Branson',
    amount: '40000',
    currency: 'EUR'
  }],

  nextBid: {
    amount: '40000',
    currency: 'EUR'
  }
};

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
      <button className='bidbtn'>
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
})

var AuctionRoom = React.createClass({
  render: function () {
    return (
      <div className='auction-room'>
        <div className='auction-room__row'>
          <Lot value={this.props.lot} />
        </div>

        <div className='auction-room__row'>
          <BidBtn bid={this.props.nextBid} />
          <HighestBid bid={highestBid(this.props)} />
        </div>
      </div>
    )
  }
})

React.render(React.createElement(AuctionRoom, auction), document.getElementById('app'));
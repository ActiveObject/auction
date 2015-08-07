import React from 'react'

var auction = {
  lot: {
    name: 'Mercedes Benz 300 ‘Adenauer’ Convertible Conversion, 1953',
    desc: 'For this auction, we have assembled a very special selection of chronographs that will entice both new and experienced collectors. Watch lovers can look forward to rare highlights such as a Breitling Premier Chronograph, Ref. 734, and a stylish HY Moser & Cie single button chronograph. With its wide range of manufactures and some remarkable entry prices, this auction presents a unique opportunity for all aficionados of fine timepieces.',
    picture: {
      href: 'pictures/210518-0028-h.jpg'
    }
  },

  nextBid: {
    amount: '40000',
    currency: 'EUR'
  },

  highestBidder: {
    name: 'Richard Branson',
    bid: {
      amount: '40000',
      currency: 'EUR'
    }
  }
};

var Lot = React.createClass({
  render: function () {
    return (
      <div className='lot'>
        <span className='lot__name'>{this.props.value.name}</span>
        <img className='lot__picture' src={this.props.value.picture.href} />
        <span className='lot_desc'>{this.props.value.desc}</span>
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

var HighestBidder = React.createClass({
  render: function () {
    return (
      <div className='highest-bidder'>
        <span className='highest-bidder__name'>{this.props.user.name}</span>
        <span className='highest-bidder__bid'>
          <Bid value={this.props.user.bid} />
        </span>
      </div>
    )
  }
})

var AuctionRoom = React.createClass({
  render: function () {
    return (
      <div className='auction-room'>
        <Lot value={this.props.lot} />
        <BidBtn bid={this.props.nextBid} />
        <HighestBidder user={this.props.highestBidder} />
      </div>
    )
  }
})

React.render(React.createElement(AuctionRoom, auction), document.getElementById('app'));
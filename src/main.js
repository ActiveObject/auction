import React from 'react'
import Atom from 'app/Atom'
import db from 'app/db'
import merge from 'app/merge'
import AuctionRoom from 'app/ui/AuctionRoom'
import SignIn from 'app/ui/SignIn'
import * as Auction from 'app/Auction'
import 'app/styles/main.css'

var AuctionLoader = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true
    }
  },

  componentDidMount: function () {
    Auction.load(this.props.auctionId)
      .then((v) => {
        Atom.update(db, function (appstate) {
          return merge(appstate, {
            auction: v
          });
        });

        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err);
      })
  },

  render: function () {
    if (this.state.isLoading) {
      return <div>Loading...</div>
    }

    return <AuctionRoom auction={db.value.auction} user={db.value.user} />;
  }
});

var App = React.createClass({
  render: function () {
    if (db.value.user) {
      return <AuctionLoader auctionId={db.value.auction.id} />;
    }

    return <SignIn />;
  }
});

function render(rootEl) {
  React.render(React.createElement(App), rootEl);
}

var rootEl = document.getElementById('app');
Atom.listen(db, () => render(rootEl));
render(rootEl);

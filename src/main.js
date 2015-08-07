import React from 'react'
import Atom from 'app/Atom'
import db from 'app/db'
import AuctionRoom from 'app/ui/AuctionRoom'
import SignIn from 'app/ui/SignIn'
import 'app/styles/main.css'

var App = React.createClass({
  render: function () {
    if (db.value.user) {
      return <AuctionRoom auction={db.value.auction} user={db.value.user} />;
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

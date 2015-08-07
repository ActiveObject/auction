import React from 'react'
import merge from 'app/merge'
import db from 'app/db'
import Atom from 'app/Atom'

export default React.createClass({
  render: function () {
    return (
      <div className='signin'>
        <input ref='input' className='signin__input' placeholder='Enter your name to join to the auction' onKeyDown={this.onKeyDown} />
        <button className='btn' onClick={this.join}>Join</button>
      </div>
    )
  },

  onKeyDown: function (e) {
    if (e.keyCode === 13) {
      this.join();
    }
  },

  join: function () {
    var user = this.refs.input.getDOMNode().value.trim();

    if (user) {
      Atom.update(db, function (appstate) {
        return merge(appstate, {
          user: user
        });
      });
    }
  }
});
import { EventEmitter } from 'events'

export function highestBid(auction) {
  if (!isStarted(auction)) {
    throw new Error('Auction should be started to get a highest bid');
  }

  return auction.bids[auction.bids.length - 1];
}

export function isStarted(auction) {
  return auction.bids.length > 0;
}

var fakeServer = new EventEmitter();

/**
 * POST /auctions/{auctionId}
 */
export function sendNewBid(auctionId, bid) {
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
      }, 100);
    }, 100);
  });
}

/**
 * GET /auctions/{auctionId}/live-bids
 * Assume that server uses SSE to notify browser about changes.
 */
export function listenAuctionBids(auction) {
  var stream = new EventEmitter();

  fakeServer.on('res', function (res) {
    stream.emit('bid', res.bid);
  });

  return stream;
}
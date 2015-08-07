import { EventEmitter } from 'events'
import request from 'superagent'

let AUCTION_API_URL = process.env.AUCTION_API_URL;

export function highestBid(auction) {
  if (!isStarted(auction)) {
    throw new Error('Auction should be started to get a highest bid');
  }

  return auction.bids[auction.bids.length - 1];
}

export function isStarted(auction) {
  return auction.bids.length > 0;
}

/**
 * GET /auctions/{auctoinId}
 */
export function load(auctionId) {
  return new Promise(function (resolve, reject) {
    request(AUCTION_API_URL + '/auctions/' + auctionId).end(function (err, res) {
      if (err) {
        return reject(err);
      }

      return resolve(res.body);
    });
  });
}

/**
 * POST /auctions/{auctionId}
 */
export function sendNewBid(auctionId, bid) {
  return new Promise(function (resolve, reject) {
    request
      .post(AUCTION_API_URL + '/auctions/' + auctionId)
      .send(bid)
      .end(function (err, res) {
        if (err) {
          return reject(err);
        }

        if (!res.ok) {
          return reject(new Error(res.text));
        }

        return resolve(res.body);
      });
  });
}

/**
 * GET /auctions/{auctionId}/live-bids
 * Assume that server uses SSE to notify browser about changes.
 */
export function listenAuctionBids(auction) {
  var stream = new EventEmitter();
  var es = new EventSource(AUCTION_API_URL + '/auctions/' + auction.id + '/live-bids');

  es.addEventListener('message', function (event) {
    try {
      stream.emit('bid', JSON.parse(event.data));
    } catch (e) {
      console.log(e);
    }
  });

  return stream;
}
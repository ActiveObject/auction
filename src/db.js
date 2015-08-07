import Atom from 'app/Atom'

export default new Atom({
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
  },

  user: 'Richard Branson'
});
const Hashids = require('hashids');
const config = require('../config');

const hashids = new Hashids(config.secret, 12, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

module.exports = {
  encode: id => hashids.encode(id),
  decode: (hash) => {
    const id = hashids.decode(hash);

    if (id.length === 1) {
      return id[0];
    }

    return id;
  },
};

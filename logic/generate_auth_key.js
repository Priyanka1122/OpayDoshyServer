var crypto = require('crypto');
const generate_auth_key= async function (get_auth_key) {

    let auth_create = crypto.randomBytes(30).toString('hex');
  
    return auth_create;
  }

  module.exports = generate_auth_key;
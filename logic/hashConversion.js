let bcrypt = require('bcryptjs');

const hashPassword = async (hashItem) => {
    // const password = user.password
    const hashIt = hashItem;
    const saltRounds = 10;
  
    // const hashedPassword = await new Promise((resolve, reject) => {
     return await new Promise((resolve, reject) => {

      bcrypt.hash(hashIt, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    // return hashedPassword
  }

   module.exports = hashPassword;
const jwt = require('jsonwebtoken')

const config =require("config");

console.log(config.secretkey)


token_decode = (token) => {
    try {
        const decode = jwt.verify(token, config.secretkey)
        // console.log(JSON.stringify(decode._id))
        if (decode) {
            return decode
        }
        return false
    }
    catch (err) {
        return false
    }
}


module.exports = token_decode
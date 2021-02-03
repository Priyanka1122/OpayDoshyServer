
//const joi = require("joi");
const universalFunction = require("../../lib/universal-Function");

module.exports = {
    vaildObject: async function (security_key,auth_key, res) {
    if (security_key === undefined || security_key === null || security_key === "") return res.json({ status: false, msg: 'Please provide the security key.' })
   if (security_key != "OPAY@123") 
   { 
        message = "Invalid security key";
       res.status(403).json( {'success': false,'code': 403,'msg': message, });
      res.end();
      return false;
  }

 }
}


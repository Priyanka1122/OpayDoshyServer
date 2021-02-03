
const { required } = require('joi');
module.exports = {
    userModel: require("./customer"),
    opayWork:require("./opaywork"),
    faqs:require("./faqs"),
    contactus:require("./contactus"),
    newBill:require("./newBill"),
    onbordBiller:require("./onbordBiller"),
    addressModel:require("./address"),
    statelist:require("./statelist"),
   NotificationList:require("./notificationlist"),
   admin:require("./admin"),
   termsCondition:require("./termsCondition")

};


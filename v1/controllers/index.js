const { required } = require("joi");

module.exports = {
    userController: require("./userController"),
    userBill_Controller : require("./userBill_Controller"),
    admin_Controller : require("./admin_Controller")
};
const router = require("express").Router();
const Routes = require("./routes");
//console.log(Routes)

router.use("/opay", Routes.userRoute);

module.exports = router;
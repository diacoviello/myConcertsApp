const router = require("express").Router();

// const homeRoutes = require("./home-routes");
const eventRoutes = require("./eventRoutes");

// router.use("/user", homeRoutes);
router.use("/event", eventRoutes);

module.exports = router;





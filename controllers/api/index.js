const router = require("express").Router();

const userRoutes = require("./userRoutes");
const eventRoutes = require("./eventRoutes");

router.use("/user", userRoutes);
router.use("/event", eventRoutes);

module.exports = router;





const router = require("express").Router();
const userRoutes = require("./userRoutes");
const artistRoutes = require("./artistRoutes");
const eventRoutes = require("./eventRoutes");

router.use("/users", userRoutes);
router.use("/artists", artistRoutes);
router.use("/events", eventRoutes);

module.exports = router;

const router = require("express").Router();

// const homeRoutes = require("./home-routes");
const eventRoutes = require("./eventRoutes");
<<<<<<< HEAD

// router.use("/user", homeRoutes);
router.use("/event", eventRoutes);

module.exports = router;
=======
>>>>>>> dd720e1295f36241256c44e5684e95a0595bbc65

// router.use("/user", userRoutes);
router.use("/event", eventRoutes);

module.exports = router;


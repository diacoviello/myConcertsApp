const path = require("path");
const express = require("express");
const session = require("express-session");
// Initializes Sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const homeRoutes = require("./controllers/home-routes");
const eventRoutes = require("./controllers/api/eventRoutes");
const userRoutes = require("./controllers/api/userRoutes");
const sequelize = require("./config/connection");
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Sets up session and connect to our Sequelize db
const sess = {
  secret: "Super secret secret",

  // Tells our session to use cookies
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(routes);

app.use("/api", eventRoutes);
app.use("/api", userRoutes);
app.use("/", homeRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

const router = require("express").Router();
const { Artist } = require("../../models");

router.get("/", (req, res) => {
  Artist.findAll({
    // attributes: { exclude: ["[password"] },
  })
    .then((dbArtistData) => res.json(dbArtistData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newArtist = await Artist.create({
      // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD
      email: req.body.email,
      password: req.body.password,
      //   user_id: req.session.user_id,
      // TODO: SET USERID TO LOGGEDIN USERID
    });
    res.json(newArtist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const artist = await Artist.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }
    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

module.exports = router;

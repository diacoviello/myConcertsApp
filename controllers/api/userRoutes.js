const router = require('express').Router();
const { User } = require('../../models');

router.get("/", (req, res) => {
  User.findAll({
    // attributes: { exclude: ["[password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/api/users", async (req, res) => {
  console.log(req.body);
  console.log("POST /api/users");

  await User.create({
    // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD
    email: req.body.email,
    password: req.body.password,
    //   user_id: req.session.user_id,
    // TODO: SET USERID TO LOGGEDIN USERID
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  // console.log(req.body);
  // try {
  //   const newUser = await User.create({
  //     // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD
  //     email: req.body.email,
  //     password: req.body.password,
  //     //   user_id: req.session.user_id,
  //     // TODO: SET USERID TO LOGGEDIN USERID
  //   });
  //   res.json(newUser);
    
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
});

router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (!user) {
        res.status(400).json({ message: 'No user account found!' });
        return;
      }
      const validPassword = user.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'No user account found!' });
        return;
      }
    } catch (err) {
        res.status(400).json({ message: 'No user account found!' });
      }
 });

   module.exports = router;

const router = require('express').Router();
const { User } = require('../../models');
// const router = require('../home-routes');
router.post('/', async (req, res) => {
    try {
      const newUser = await User.create({
        // TODO: SET USERNAME TO USERNAME SENT IN REQUEST
        email: req.body.email,
        password: req.body.password,
        // TOD: SET PASSWORD TO PASSWORD SENT IN REQUEST
      });
     res.json(newUser);
    
    } catch (err) {
      res.status(500).json(err);
    }
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
    res.json({ user, message: 'You are now logged in!' });
      
    } catch (err) {
      res.status(400).json({ message: 'No user account found!' });
    }
  });

   module.exports = router;
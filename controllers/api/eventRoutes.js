const router = require("express").Router();
const { Event } = require("../../models/");
// const withAuth = require('../../utils/auth');

router.post("/", async (req, res) => {
 Event.create({
   // TODO: POST BODY SENT IN REQUEST. HINT USING SPREAD
   artist_name: req.body.artist_name,
   venue_name: req.body.venue_name,
   location: req.body.location,
   date: req.body.date,
   time: req.body.time,
   event_url: req.body.event_url,
   //   user_id: req.session.user_id,
   // TODO: SET USERID TO LOGGEDIN USERID
 })
   .then((dbEventData) => res.json(dbEventData))
   .catch((err) => {
     console.log(err);
     res.status(500).json(err);
   });
});

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Event.findAll({

  })
  .then((dbEventData) => res.json(dbEventData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })

  // try {
  //   const eventData = await Event.findAll({
  //     // JOIN with travellers, using the Trip through table
  //   });

  //   if (!eventData) {
  //     res.status(404).json({ message: "No event found !" });
  //     return;
  //   }

  //   res.status(200).json(eventData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const [affectedRows] = await Event.update(req.body, {
//       // TODO: SET ID TO ID PARAMETER INSIDE WHERE CLAUSE CONDITION FIELD
//     });

//     if (affectedRows > 0) {
//       res.status(200).end();
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: "No event found with this id!" });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

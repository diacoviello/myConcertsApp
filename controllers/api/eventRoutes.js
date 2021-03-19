const router = require("express").Router();
const event = require("../../models");

router.get("/api/events", async (req, res) => {
  try {
    const eventData = await event.findAll({

    });
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a event
router.post("/", async (req, res) => {
  try {
    const eventData = await event.create(req.body);
    res.status(200).json(eventData);
  } catch (err) {
    res.status(400).json(err);
  }
});



// DELETE a event
router.delete("/:id", async (req, res) => {
  try {
    const eventData = await event.destroy({
      where: { id: req.params.id },
    });
    if (!eventData) {
      res.status(404).json({ message: "No event with this id!" });
      return;
    }
    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

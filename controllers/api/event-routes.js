const router = require('express').Router();
const Event = require('../../models/Event');

// route to create/add a event
router.post('/', async (req, res) => {
  try {
    const eventData = await Event.create({
      event_name: req.body.event_name,
    });
    res.status(200).json(eventData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// According to MVC, what is the role of this action method?
// This action method is the Controller. It accepts input and sends data to the Model and the View.
router.put('/:id', async (req, res) => {
  // Where is this action method sending the data from the body of the fetch request? Why?
  // It is sending the data to the Model so that one event can be updated with new data in the database.
  try {
    const event = await Event.update(
      {
        event_name: req.body.event_name,
        },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    // If the database is updated successfully, what happens to the updated data below?
    // The updated data (event) is then sent back to handler that dispatched the fetch request.
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

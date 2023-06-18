const router = require('express').Router();
const Event = require('../models/Event');

// route to get all events
router.get('/', async (req, res) => {
    const eventData = await Event.findAll().catch((err) => { 
        res.json(err);
      });
        const events = eventData.map((event) => event.get({ plain: true }));
        // console.log(events);
        res.render('all', { events });
      });
  
  // route to get one event
  router.get('/event/:id', async (req, res) => {
    try{ 
        const eventData = await Event.findByPk(req.params.id);
        if(!eventData) {
            res.status(404).json({message: 'No event with this id!'});
            return;
        }
        const event = eventData.get({ plain: true });
        res.render('event', event);
      } catch (err) {
          res.status(500).json(err);
      };     
  });

module.exports = router;

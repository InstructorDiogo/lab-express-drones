const express = require('express');
const Drone = require("../models/Drone.model")
const router = express.Router();

// ONLY 4 LUCAS PPL
router.get('/dronesAmount', (req, res, next) => {

  Drone.find().then((drones) => {

    res.json(drones.length)

  }).catch(err => {
    next(err)
  })

});



router.get('/drones', (req, res, next) => {

  Drone.find().then((drones) => {

    res.render("drones/list", { drones })

  }).catch(err => {
    next(err)
  })

});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone

  const { name, propellers, maxSpeed } = req.body

  Drone.findOne({ name }).then(drone => {
    if (!drone) {
      Drone.create({ name, propellers, maxSpeed })
        .then(drone => (
          res.redirect("/drones")
        )).catch(err => next(err))
    }
    else {
      res.render("error", { error: "Drone already exists." })
    }
  }).catch(err => next(err))


});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params

  Drone.findById(id)
    .then(drone => {
      res.render("drones/update-form", { drone })
    }).catch(err => next(err))

});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone

  const { id } = req.params
  const { name, propellers, maxSpeed } = req.body

  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new: true })
    .then(updatedDrone => {

      console.log(`Drone ${drone.name} updated.`)
      res.redirect("/drones")

    })

});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone

  const { id } = req.params

  Drone.findByIdAndDelete(id)
    .then(drone => {
      console.log(`Drone ${drone.name} deleted.`)
      res.redirect("/drones")
    })

});

module.exports = router;

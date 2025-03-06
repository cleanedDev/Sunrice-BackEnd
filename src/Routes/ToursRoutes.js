const express = require("express");
const router = express.Router();

//invocando controladores
const {getAllTours, tourByID,crearReservaTour} = require("../Controllers/ToursControllers")

// Ruta para obtener todos los tours
router.get("/allTours", getAllTours);
router.get("/tourByID/:id", tourByID);

router.post("/createReservationTour", crearReservaTour)

module.exports = router;

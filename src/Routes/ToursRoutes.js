const express = require("express");
const router = express.Router();

//invocando controladores
const {getAllTours, tourByID,crearReservaTour,getAllToursEn,tourByIDEn} = require("../Controllers/ToursControllers")

// Ruta para obtener todos los tours
router.get("/allTours", getAllTours);  
router.get("/allToursEn", getAllToursEn); 

router.get("/tourByID/:id", tourByID);
router.get("/tourByIDEn/:id", tourByIDEn);

router.post("/createReservationTour", crearReservaTour)

module.exports = router;

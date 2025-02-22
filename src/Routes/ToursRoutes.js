const express = require("express");
const router = express.Router();

//invocando controladores
const {getAllTours} = require("../Controllers/ToursControllers")

// Ruta para obtener todos los tours
router.get("/allTours", getAllTours);

module.exports = router;

const express = require("express");
const router = express.Router();

const {getAllDates,dateByID,crearReservaHospedaje,editarReservaHospedaje,eliminarReservaHospedaje} = require("../Controllers/HospedajeControllers")

router.get("/ReservationsHotel/", getAllDates);
router.get("/dateByID/:id", dateByID);

router.post("/crearReservaHospedaje/", crearReservaHospedaje);
router.put("/editarReservaHospedaje/:id", editarReservaHospedaje);

router.delete("/deleteReservaHospedaje/:id", eliminarReservaHospedaje )




module.exports = router;
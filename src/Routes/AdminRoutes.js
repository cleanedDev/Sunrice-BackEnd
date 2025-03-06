const express = require("express");
const router = express.Router();

//invocando controladores
const {formContact} = require("../Controllers/adminControllers")


// Ruta para obtener todos los tours

router.post("/enviarMensajeContacto/", formContact);

module.exports = router;
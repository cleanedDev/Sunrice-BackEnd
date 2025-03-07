const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
    folio: { 
        type: String, 
        required: true, 
        unique: true 
    },
    tourElegido: {
        type: String,
        required: true
    },
    cantidadPersonas:{
        type:String,
        required:true
    },
    nombre: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    correo: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Por favor, ingresa un correo electrónico válido']
    },
    telefono: {
        type: String,
        required: true
    },
    extras: {
        type: String, // Ahora es un campo de texto en lugar de un array
        default: ""
    },
    hospedaje: {
        fechaInicio: { type: Date },
        fechaFin: { type: Date },
    },
    estado: { 
        type: String, 
        enum: ["pendiente", "confirmado", "cancelado"], 
        default: "pendiente" 
    },
    contactPref: { 
        type: String, 
        enum: ["whatsapp", "correo electronico"] 
    }
}, { timestamps: true });

const tourReservaModel = mongoose.model('Reserva', ReservaSchema, "reservations");

module.exports = tourReservaModel;

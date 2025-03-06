const mongoose = require("mongoose");

const HospedajeSchema = new mongoose.Schema({
    folio: { 
        type: String, 
        required: true, 
        unique: true 
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    cantidadPersonas: { 
        type: Number, 
        required: true, // Es obligatorio
        min: 1 // No puedes tener menos de una persona
    },
    fechaFin: {
        type: Date,
        required: true
    },
    nombre: {
        type: String,
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
   
    estado: {
        type: String,
        enum: ["pendiente", "confirmado", "cancelado"],
        default: "pendiente"
    },
    contactPref: {
        type: String,
        enum: ["whatsapp","correo electronico"],
        required: true
    },
    
}, { timestamps: true });

const HospedajeModel = mongoose.model('Hospedaje', HospedajeSchema, "reservationsH");

module.exports = HospedajeModel;




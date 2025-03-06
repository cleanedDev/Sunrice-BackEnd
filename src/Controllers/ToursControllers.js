
const ToursModel = require("../Models/TourModel");
const tourReservaModel = require("../Models/TourRModel");

const {detailReservationEmailTours,  notifyReservationAdmin} = require("../utils/Nodemailer")


const getAllTours = async (req, res) => {
    try {
      const allTours = await ToursModel.find()  // Obtén todos los tours desde la base de datos
      // console.log(allTours)
      res.send({
        msg: "Todos los tours",
        data: allTours,  // Envía los tours obtenidos
      });
    } catch (error) {
      res.status(400).send({ msg: "No se pudo obtener los tours", error: error });
    }
  }

  const tourByID = async (req, res) => {
    try {
        // Asegúrate de que 'tour' es el modelo y usa findById
        const tour = await ToursModel.findById(req.params.id); 
        
        if (!tour) {
            return res.status(404).json({ mensaje: 'Tour no encontrado' });
        }
        res.status(200).json({ msg: "El tour es:", data: tour });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

const crearReservaTour = async (req, res) => {
    try {
        const {tourElegido, fechaInicio, fechaFin, cantidadPersonas, nombre, correo, telefono, extras, hospedaje, contactPref} = req.body;

        // Validación básica
        if (!tourElegido || !fechaInicio || !fechaFin || !cantidadPersonas || !nombre || !correo || !telefono || !contactPref) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        // Convertir las fechas a tipo Date para la reserva del tour
        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);

        // Validación de las fechas de la reserva del tour
        if (fechaInicioDate >= fechaFinDate) {
            return res.status(400).json({ mensaje: "La fecha de inicio debe ser antes que la fecha de fin" });
        }

        // Verificar si el objeto hospedaje tiene fechas
        let hospedajeFechaInicio = null;
        let hospedajeFechaFin = null;

        if (hospedaje && hospedaje.fechaInicio && hospedaje.fechaFin) {
            // Convertir las fechas de hospedaje a tipo Date
            hospedajeFechaInicio = new Date(hospedaje.fechaInicio);
            hospedajeFechaFin = new Date(hospedaje.fechaFin);

            // Validar que las fechas de hospedaje sean correctas
            if (isNaN(hospedajeFechaInicio) || isNaN(hospedajeFechaFin)) {
                return res.status(400).json({ mensaje: "Las fechas de hospedaje son inválidas" });
            }

            if (hospedajeFechaInicio >= hospedajeFechaFin) {
                return res.status(400).json({ mensaje: "La fecha de inicio del hospedaje debe ser antes que la fecha de fin" });
            }
        }

        // Obtener el último folio de reserva y generar el siguiente
        const lastFolio = await tourReservaModel.findOne().sort({ folio: -1 }).limit(1);
        const lastFolioNumber = lastFolio ? parseInt(lastFolio.folio.split('-')[1]) : 0;
        const newFolio = `SAMBT-${(lastFolioNumber + 1).toString().padStart(4, '0')}`;

      // Crear nueva reserva de tour
        const nuevaReservaTour = new tourReservaModel({
            folio: newFolio, // Asignamos el nuevo folio aquí
            fechaInicio: fechaInicioDate,
            fechaFin: fechaFinDate,
            cantidadPersonas: cantidadPersonas,
            tourElegido: tourElegido,
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            extras: extras,
            hospedaje: {
                fechaInicio: hospedajeFechaInicio,
                fechaFin: hospedajeFechaFin
            },
            estado: "pendiente", // Estado inicial
            contactPref: contactPref,
        });

        // Guardar en la base de datos
        const reservaGuardada = await nuevaReservaTour.save();

        // Enviar detalles a los clientes
        await detailReservationEmailTours(nuevaReservaTour);

        // Notificar al administrador
        await notifyReservationAdmin(nuevaReservaTour);

      res.status(201).json({ mensaje: "Reserva creada exitosamente", data: reservaGuardada });
    } catch (error) {
      res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};


  


  //Exportando controladores para endpoints 
  module.exports = {
    getAllTours,
    tourByID,
    crearReservaTour
  };
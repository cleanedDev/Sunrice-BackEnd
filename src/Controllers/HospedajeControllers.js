const HospedajeModel = require("../Models/HospedajeModel")

const {detailReservationEmail,modifiedReservationEmail,notifyReservationAdmin} = require("../utils/Nodemailer")


const getAllDates = async (req, res) => {
    try {
      const allReservations = await HospedajeModel.find()  // Obtén todos los tours desde la base de datos
      // console.log(allTours)
      res.send({
        msg: "Todos las fechas reservadas",
        data: allReservations,  // Envía los tours obtenidos
      });
    } catch (error) {
      res.status(400).send({ msg: "No se pudo obtener las fechas", error: error });
    }
  }


  const dateByID = async (req, res) => {
    try {
        // Asegúrate de que 'tour' es el modelo y usa findById
        const date = await HospedajeModel.findById(req.params.id); 
        
        if (!date) {
            return res.status(404).json({ mensaje: 'fecha no encontrada' });
        }
        res.status(200).json({ msg: "El reservacion es:", data: date });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

const crearReservaHospedaje = async (req, res) => {
    try {
        const { fechaInicio, fechaFin,cantidadPersonas, nombre, correo, telefono, contactPref} = req.body;

        // Validación básica
        if (!fechaInicio || !fechaFin || !nombre || !correo || !telefono || !contactPref) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        // Convertir las fechas a tipo Date (si es necesario)
        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);

        if (fechaInicioDate >= fechaFinDate) {
            return res.status(400).json({ mensaje: "La fecha de inicio debe ser antes que la fecha de fin" });
        }

        const lastFolio = await HospedajeModel.findOne().sort({ folio: -1 }).limit(1);
        const lastFolioNumber = lastFolio ? parseInt(lastFolio.folio.split('-')[1]) : 0;

        // Generar el siguiente folio con el prefijo 'SAMB' y el número incremental
        const newFolio = `SAMB-${(lastFolioNumber + 1).toString().padStart(4, '0')}`;
        

        // Crear nueva reserva
        const nuevaReserva = new HospedajeModel({
            folio: newFolio, // Asignamos el nuevo folio aquí
            fechaInicio: fechaInicioDate,
            fechaFin: fechaFinDate,
            nombre,
            correo,
            telefono,
            cantidadPersonas,
            estado: "pendiente", // Estado inicial
            contactPref
        });

        // Guardar en la base de datos
        const reservaGuardada = await nuevaReserva.save();

        //Enviar detalles a clientes
        await detailReservationEmail(nuevaReserva);
        //enviar notificacion admin
         await notifyReservationAdmin(nuevaReserva);

        res.status(201).json({ mensaje: "Reserva creada exitosamente", data: reservaGuardada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error });
    }
};

const editarReservaHospedaje = async (req, res) => {
    try {
        const { id } = req.params;
        const { fechaInicio, fechaFin,cantidadPersonas, nombre, correo, telefono, estado } = req.body;

        // Validación básica
        if (!fechaInicio || !fechaFin || !nombre || !cantidadPersonas ||!correo || !telefono) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        // Convertir las fechas a tipo Date
        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);

        if (fechaInicioDate >= fechaFinDate) {
            return res.status(400).json({ mensaje: "La fecha de inicio debe ser antes que la fecha de fin" });
        }

        // Buscar y actualizar la reservación
        const reservaActualizada = await HospedajeModel.findByIdAndUpdate(
            id,
            {
                fechaInicio: fechaInicioDate,
                fechaFin: fechaFinDate,
                nombre,
                correo,
                cantidadPersonas,
                telefono,
                estado, // Permitimos que se actualice el estado
                
            },
            { new: true } // Devuelve el documento actualizado
        );

        await modifiedReservationEmail(reservaActualizada);

        if (!reservaActualizada) {
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        }

        res.status(200).json({ mensaje: "Reserva actualizada exitosamente", data: reservaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error });
    }
};

const eliminarReservaHospedaje = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar la reserva
        const reservaEliminada = await HospedajeModel.findByIdAndDelete(id);

        if (!reservaEliminada) {
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        }

        res.status(200).json({ mensaje: "Reserva eliminada exitosamente", data: reservaEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error });
    }
};





  module.exports = {
    getAllDates,
    dateByID,
    crearReservaHospedaje,
    editarReservaHospedaje,
    eliminarReservaHospedaje
    
  };
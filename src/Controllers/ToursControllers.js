// inbocando modelo de Tours
const ToursModel = require("../Models/TourModel");


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


  //Exportando controladores para endpoints 
  module.exports = {
    getAllTours,
  
  };
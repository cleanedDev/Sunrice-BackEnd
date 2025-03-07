const mongoose = require('mongoose');

const tourSchemaEn = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  descripcion: {
    text: { 
      type: String,
      required: true 
    },

    includes: {
      type: [String],
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },
  },

  images: {
    type: [String],
    required: true,
  },

  options: {
    type: String,
    required: true,
  },
});

const TourModelEn = mongoose.model('TourEn', tourSchemaEn, "ToursEn");

module.exports = TourModelEn;

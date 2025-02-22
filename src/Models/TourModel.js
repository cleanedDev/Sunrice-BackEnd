const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
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

const TourModel = mongoose.model('Tour', tourSchema, "Tours");

module.exports = TourModel;

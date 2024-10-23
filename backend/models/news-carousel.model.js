const mongoose = require('mongoose');

const newsCarouselSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NewsCarousel', newsCarouselSchema);

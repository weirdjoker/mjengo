const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  budget: { type: Number },
  timeline: { type: String },
  builder: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  progress: { type: Number, default: 0 },
});

module.exports = mongoose.model('Project', projectSchema);
const mongoose = require('mongoose');

const performerSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	name: { type: String, required: true },
});

module.exports = mongoose.model('Performer', performerSchema);

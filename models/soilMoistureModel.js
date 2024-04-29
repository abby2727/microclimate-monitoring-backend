const mongoose = require('mongoose');

const soilMoistureSchema = mongoose.Schema(
	{
		value: {
			type: Number,
			required: [true, 'Please add a value']
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('SoilMoisture', soilMoistureSchema);

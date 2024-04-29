const mongoose = require('mongoose');

const lightIntensitySchema = mongoose.Schema(
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

module.exports = mongoose.model('LightIntensity', lightIntensitySchema);

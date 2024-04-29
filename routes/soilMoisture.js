const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const authenticateToken = require('../middleware/authMiddleware');

const SoilMoisture = require('../models/soilMoistureModel');

router.get('/', async (req, res) => {
	try {
		const soilMoisture = await SoilMoisture.find();
		const formattedSoilMoisture = soilMoisture.map((doc) => {
			return {
				...doc._doc,
				createdAt: moment(doc.createdAt)
					.tz('Asia/Manila')
					.format('YYYY-MM-DD HH:mm:ss'),
				updatedAt: moment(doc.updatedAt)
					.tz('Asia/Manila')
					.format('YYYY-MM-DD HH:mm:ss')
			};
		});
		res.status(200).json(formattedSoilMoisture);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error', stack: err.stack });
	}
});

router.post('/', authenticateToken, async (req, res) => {
	try {
		const { value } = req.body;
		if (!value) res.status(400).json({ message: 'Please provide a value' });

		const soilMoisture = await SoilMoisture.create({ value });
		res.status(201).json(soilMoisture);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error', stack: err.stack });
	}
});

module.exports = router;

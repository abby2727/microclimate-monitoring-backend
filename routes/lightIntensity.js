const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const authenticateToken = require('../middleware/authMiddleware');

const LightIntensity = require('../models/lightIntensityModel');

router.get('/', async (req, res) => {
	try {
		const lightIntensity = await LightIntensity.find();
		const formattedLightIntensity = lightIntensity.map((doc) => {
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
		res.status(200).json(formattedLightIntensity);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error', stack: err.stack });
	}
});

router.post('/', authenticateToken, async (req, res) => {
	try {
		const { value } = req.body;
		if (!value) res.status(400).json({ message: 'Please provide a value' });

		const lightIntensity = await LightIntensity.create({ value });
		res.status(201).json(lightIntensity);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error', stack: err.stack });
	}
});

module.exports = router;

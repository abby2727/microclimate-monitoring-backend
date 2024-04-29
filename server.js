const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDb();

//* Home Route
app.get('/', (req, res) => {
	res.send('Microclimate Monitoring System - Backend API');
});

const humidityRouter = require('./routes/humidity');
const soilMoistureRouter = require('./routes/soilMoisture');
const temperatureRouter = require('./routes/temperature');
const lightIntensityRouter = require('./routes/lightIntensity');

app.use('/api/humidity', humidityRouter);
app.use('/api/soil-moisture', soilMoistureRouter);
app.use('/api/temperature', temperatureRouter);
app.use('/api/light-intensity', lightIntensityRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

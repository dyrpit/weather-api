const epxress = require('express');
const cors = require('cors');
require('dotenv').config();
const { fetchWeather, fetchWeatherAlerts } = require('./fetch');

const app = epxress();

app.use(cors());

app.get('/weather', async (req, res) => {
	const { location, lat, lng } = req.query;

	try {
		const weatherData = await fetchWeather(lat, lng, location);

		if (!weatherData) {
			return res.status(404).json('No weather found');
		}
		res.json(weatherData);
	} catch (e) {
		console.error(e);
		return res.status(400).json({ message: e.message });
	}
});

app.get('/weather/alerts', async (req, res) => {
	const { lat, lng } = req.query;

	try {
		const weatherAlerts = await fetchWeatherAlerts(lat, lng);

		if (!weatherAlerts) {
			return res.status(404).json({ message: 'No weather alerts' });
		}

		return res.json(weatherAlerts);
	} catch (e) {
		console.error(e);
		return res.status(400).json({ message: e.message });
	}
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listen at port: ${port}`));

const epxress = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const fetchWeather = require('./fetch');

const app = epxress();

app.use(cors());

app.get('/weather', async (req, res) => {
	const { location, lat, lng } = req.query;

	try {
		const weatherData = await fetchWeather(lat, lng, location);

		if (!weatherData) {
			return res.sendStatus(404);
		}
		res.json(weatherData);
	} catch (e) {
		console.log(e);
		res.sendStatus(404);
	}
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listen at port: ${port}`));

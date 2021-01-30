const axios = require('axios');

module.exports = fetchWeather = (lat, lng, location) => {
	const defaultLocation = location || 'Warsaw';
	const encodedLocation = encodeURI(defaultLocation);

	let URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}&mode=json&units=metric&appid=${process.env.API_KEY}`;

	if (lat && lng) {
		URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&mode=json&units=metric&appid=${process.env.API_KEY}`;
	}

	return axios
		.get(URL)
		.then((response) => {
			if (response.statusText === 'OK') {
				return response.data;
			} else {
				return null;
			}
		})
		.catch((e) => {
			throw new Error(e.response.data.message);
		});
};

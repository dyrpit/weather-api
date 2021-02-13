const axios = require('axios');

module.exports = {
	fetchWeather: (fetchWeather = (lat, lng, location) => {
		const defaultLocation = location || 'Warsaw';
		const encodedLocation = encodeURI(defaultLocation);

		let URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}&mode=json&units=metric&appid=${process.env.API_KEY}`;

		if (lat && lng) {
			URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&mode=json&units=metric&appid=${process.env.API_KEY}`;
		}

		return axios
			.get(URL)
			.then((response) => {
				if (response.statusText !== 'OK') {
					throw new Error('Failed while fetching weather');
				} else {
					return response.data;
				}
			})
			.catch((e) => {
				if (e.response.status === 400) {
					throw new Error(e.response.data.message);
				}
				throw new Error(e);
			});
	}),
	fetchWeatherAlerts: (fetchWeatherAlerts = (lat, lng) => {
		const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,hourly,daily&appid=${process.env.API_KEY}`;

		if (!lat && !lng) {
			throw new Error('Latitude and longtitude parameters are required');
		}

		return axios
			.get(URL)
			.then((response) => {
				if (response.statusText !== 'OK') {
					throw new Error('Failed while fetching weather alerts');
				} else {
					return response.data;
				}
			})
			.catch((e) => {
				if (e.response.status === 400) {
					throw new Error(e.response.data.message);
				}
				throw new Error(e);
			});
	}),
	fetchWeatherHourly: (fetchWeatherAlerts = (lat, lng) => {
		const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=current,minutely,alerts,daily&appid=${process.env.API_KEY}`;

		if (!lat && !lng) {
			throw new Error('Latitude and longtitude parameters are required');
		}

		return axios
			.get(URL)
			.then((response) => {
				if (response.statusText !== 'OK') {
					throw new Error('Failed while fetching hourly weather');
				} else {
					return response.data;
				}
			})
			.catch((e) => {
				if (e.response.status === 400) {
					throw new Error(e.response.data.message);
				}
				throw new Error(e);
			});
	}),
};

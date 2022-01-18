import { HOST, KEY, LOCATION_IQ_TOKEN } from '../config/appConfig'

const axios = require("axios").default;

export const fetchWeather = ({ latitude, longitude }) => {
	var options = {
		method: 'GET',
		url: `https://dark-sky.p.rapidapi.com/${latitude},${longitude}`,
		params: { units: 'auto', lang: 'it' },
		headers: {
			'x-rapidapi-host': HOST,
			'x-rapidapi-key': KEY
		}
	};
	return promiseFunction(options)
}

export const getLocation = ({ latitude, longitude }) => {
	var options = {
		method: 'GET',
		url: `https://eu1.locationiq.com/v1/reverse.php?key=${LOCATION_IQ_TOKEN}&lat=${latitude}&lon=${longitude}&format=json`,
	};
	return promiseFunction(options)
}

export const searchCity = (city) => {
	var options = {
		method: 'GET',
		url: `https://eu1.locationiq.com/v1/search.php?key=${LOCATION_IQ_TOKEN}&q=${city}&format=json`,
	};
	return promiseFunction(options)
}


const promiseFunction = (options) => {
	return new Promise((ok, ko) => {
		axios.request(options)
			.then(response => ok(response.data))
			.catch(error => ko(error));
	});
}

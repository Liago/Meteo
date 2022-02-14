import { endpoint, api_keys } from "../config/environment.ts";

const axios = require("axios").default;

export const fetchWeather = ({ latitude, longitude }) => {
	var options = {
		method: 'GET',
		url: `${endpoint.RAPID_API}/${latitude},${longitude}`,
		params: { units: 'si', lang: 'it' },
		headers: {
			'x-rapidapi-host': endpoint.RAPID_API,
			'x-rapidapi-key': api_keys.RAPID_API
		}
	};
	return promiseFunction(options)
}

export const getLocation = ({ latitude, longitude }) => {
	var options = {
		method: 'GET',
		url: `${endpoint.LOCATION_IQ}/reverse.php?key=${api_keys.LOCATION_IQ}&lat=${latitude}&lon=${longitude}&format=json`,
	};
	return promiseFunction(options)
}

export const searchCity = (city) => {
	var options = {
		method: 'GET',
		url: `${endpoint.LOCATION_IQ}/search.php?key=${api_keys.LOCATION_IQ}&q=${city}&format=json`,
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

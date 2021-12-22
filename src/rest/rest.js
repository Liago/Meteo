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
	return new Promise((ok, ko) => {
		axios.request(options).then(function (response) {
			ok(response.data)
		}).catch(function (error) {
			console.error(error);
			ko(error)
		});
	});
}

export const getLocation = ({latitude, longitude}) => {
	var options = {
		method: 'GET',
		url: `https://eu1.locationiq.com/v1/reverse.php?key=${LOCATION_IQ_TOKEN}&lat=${latitude}&lon=${longitude}&format=json`,
	};
	
	return new Promise((ok, ko) => {
		axios.request(options).then(function (response) {
			ok(response.data)
		}).catch(function (error) {
			console.error(error);
			ko(error)
		});
	});
}
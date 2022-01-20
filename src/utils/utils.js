import 'moment/locale/it'
import moment from "moment";
import { round } from 'lodash'

export const getDataFormatted = (unixDate, dateFormat) => {
	return moment.unix(unixDate).format(dateFormat)
}

export const getWeatherIcon = (icon) => {
	// console.log('icon :>> ', icon);
	switch (icon) {
		case 'partly-cloudy-day':
			return 'day-cloudy'
		case 'clear-day':
			return 'day-sunny'
		default:
			return icon
	}
}

export const addCoordinates = (location) => {
	let coordinates = location;
	coordinates['latitude'] = location.lat;
	coordinates['longitude'] = location.lon;
	return coordinates;
}

export const getTemp = (temp) => {
	return <span>{round(temp)}°</span>
}

export const getPercent = (value) => {
	return <span>{round(value * 100)}%</span>
}
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
		case 'clear-night':
			return 'night-clear'	
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

export const itsTimeToRefresh = (forecast, selectedLocation) => {
	const { currently } = forecast[selectedLocation?.place_id]
	const forecastDay = getDataFormatted(currently.time, 'DD')
	const forecastMonth = getDataFormatted(currently.time, 'MM')
	const forecastYear = getDataFormatted(currently.time, 'YYYY')
	const todayDay = getDataFormatted(moment().unix(moment()), 'DD')
	const todayMonth = getDataFormatted(moment().unix(moment()), 'MM')
	const todayYear = getDataFormatted(moment().unix(moment()), 'YYYY')

	const forecastDownload = moment([forecastYear, forecastMonth, forecastDay]);
	const today = moment([todayYear, todayMonth, todayDay]);
	return (forecastDownload.diff(today, 'days') !== 0) ? true : false
		
}
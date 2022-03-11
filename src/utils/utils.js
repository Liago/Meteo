import icons from '../config/icons.json'

import 'moment/locale/it'
import moment from "moment";
import { round, isNil, reduce } from 'lodash'

export const getDataFormatted = (unixDate, dateFormat) => {
	return moment.unix(unixDate).format(dateFormat)
}

export const getWeatherIcon = (icon) => {
	return !isNil(icons['iconset'][icon]) ? icons['iconset'][icon] : icon;
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

export const getFlatPercent = (value) => {
	return round(value * 100)
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

const getCorrectData = (dataType) => {
	const table = {
	//	{'precipProbability', }
	}
}

export const getChartData = (forecastData, dataType) => {
	return reduce(forecastData, function (result, value) {

		console.log('dataType', dataType)



		let customValue = getFlatPercent(value[dataType])
		// result.dataset = (result.dataset || []).concat([[getDataFormatted(value.time, 'ddd HH'), value[dataType]]]);
		result.dataset = (result.dataset || []).concat([[getDataFormatted(value.time, 'ddd HH'), customValue]]);
		return result;
	}, {});
}
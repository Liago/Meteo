import 'moment/locale/it'
import moment from "moment";

export const getDataFormatted = (unixDate, dateFormat) => {
	return moment.unix(unixDate).format(dateFormat)
}

export const getWeatherIcon = (icon) => {
	// console.log('icon :>> ', icon);
	switch (icon) {
		case 'partly-cloudy-day':
			return 'day-cloudy'
	
		default:
			return icon
	}

}
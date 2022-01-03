import * as actionTypes from "./actionTypes";


export const saveLocation = (payload) => {
	return {
		type: actionTypes.SAVE_LOCATION,
		payload: payload
	}
}
export const saveLocationForecastData = (payload) => {
	return {
		type: actionTypes.SAVE_FORECAST_DATA,
		payload: payload
	}
}

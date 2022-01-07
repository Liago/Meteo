import * as actionTypes from "./actionTypes";


export const saveLocation = (payload) => {
	return {
		type: actionTypes.SAVE_LOCATION,
		payload: payload
	}
}
export const removeLocation = (payload) => {
	return {
		type: actionTypes.REMOVE_LOCATION,
		payload: payload
	}
}

export const saveLocationForecastData = (payload) => {
	return {
		type: actionTypes.SAVE_FORECAST_DATA,
		payload: payload
	}
}
export const removeLocationForecastData = (payload) => {
	return {
		type: actionTypes.REMOVE_LOCATION_DATA,
		payload: payload
	}
}
export const setCurrentLocation = (cityId) => {
	return {
		type: actionTypes.SET_CURRENT_LOCATION,
		payload: cityId
	}
}
export const resetStore = () => {
	return {
		type: actionTypes.RESET_STORE,
	}
}
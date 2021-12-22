import * as actionTypes from "./actionTypes";


export const saveForecastData = (payload) => {
	return {
		type: actionTypes.SAVE_FORECAST_DATA,
		payload: payload
	}
}

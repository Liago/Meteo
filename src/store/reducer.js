import * as actionTypes from "./actionTypes";

const initialState = {
	app: {
		darkMode: false,
		locations: [],
		selectedLocationId: null,
	},
	forecast: []
};

const app = (state = initialState.app, action) => {
	switch (action.type) {
		case actionTypes.SAVE_LOCATION:
			return {
				...state,
				locations: [...state.locations, action.payload]
			};
		case actionTypes.REMOVE_LOCATION:
			const newLocations = state.locations.filter(item => item.id !== action.payload)
			return {
				...state,
				locations: newLocations
			}
		case actionTypes.SET_CURRENT_LOCATION:
			return {
				...state,
				selectedLocationId: action.payload
			}
		case actionTypes.RESET_STORE:
			return initialState
		default:
			return state;
	}
};

const forecast = (state = initialState.forecast, action) => {
	switch (action.type) {
		case actionTypes.SAVE_FORECAST_DATA:
			return {
				...state,
				[action.payload.location]: action.payload.forecast
			};
		case actionTypes.REMOVE_LOCATION_DATA:
			const newForecasts = Object.keys(state).reduce((acc, key) => {
				if (parseInt(key) !== parseInt(action.payload))
					acc[key] = state[key]

				return acc
			}, {})
			return newForecasts

		case actionTypes.RESET_STORE:
			return initialState
			
		default:
			return state;
	}
}

const createRootReducer = { app, forecast }

export default createRootReducer;
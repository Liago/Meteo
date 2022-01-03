import _ from "lodash";
// import { reducer as formReducer } from 'redux-form';

import * as actionTypes from "./actionTypes";

const initialState = {
	app: {
		darkMode: false,
		locations: []
	},
	forecast: {}
};

const app = (state = initialState.app, action) => {
	switch (action.type) {
		case actionTypes.SAVE_LOCATION:
			return {
				...state,
				locations: [...state.locations, action.payload]
			};
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
			}
		default:
			return state;
	}
}

const createRootReducer = { app, forecast }

export default createRootReducer;
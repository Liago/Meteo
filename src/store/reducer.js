import _ from "lodash";
// import { reducer as formReducer } from 'redux-form';

import * as actionTypes from "./actionTypes";

const initialState = {
	app: {
		darkMode: false,
		forecast: null,
	},
};

const app = (state = initialState.app, action) => {
	switch (action.type) {
		case actionTypes.SAVE_FORECAST_DATA:
			return {
				...state,
				forecast: action.payload
			};

		default:
			return state;
	}
};

const createRootReducer = { app }

export default createRootReducer;
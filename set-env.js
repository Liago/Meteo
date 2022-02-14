const fs = require('fs');

const environmentFile = `export const endpoint = {
	WEATHER_FORECAST: '${process.env.WEATHER_FORECAST_ENDPOINT}',
	LOCATION_IQ: '${process.env.LOCATIONIQ_ENDPOINT}',
	test_mode: ${process.env.DEBUG},
};

export const api_keys = {
		LOCATION_IQ: '${process.env.LOCATIONIQ_TOKEN}',
		RAPID_API: '${process.env.RAPID_API_KEY}',
		RAPID_API_HOST: '${process.env.RAPID_API_HOST}',
	}
`;

fs.writeFile('./src/config/environment.ts', environmentFile, function (err) {
	if (err) {
		throw console.error(err);
	} else {
		console.log(`React environment.ts file generated`);
	}
});
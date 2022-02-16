module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		fontFamily: {
			lato: ['Lato'],
		},
		extend: {
			height: {
				'75': '75vh',
			  }
		},
	},
	variants: {},
	plugins: [],
}
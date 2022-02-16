module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		fontFamily: {
			lato: ['Lato'],
		},
		extend: {
			height: {
				'90': '90vh',
			  }
		},
	},
	variants: {},
	plugins: [],
}
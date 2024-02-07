/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: theme => ({
			  'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			  'gradient-linear': 'linear-gradient(180deg, var(--tw-gradient-stops))',
			  'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
			}),
		  }
		},
	daisyui: {
		themes: ['pastel'],
		
	},
	plugins: [require('daisyui')],
}

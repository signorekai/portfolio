/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			boxShadow: {
				window: '6px 6px 0px 0px #000',
			}
		},
		colors: {
			current: 'currentcolor',
			transparent: 'transparent',
			black: '#000',
			white: '#fff',
			yellow: {
				DEFAULT: '#FFDB58',
			},
			grey: '#f5f5f5',
			peach: '#FFAE92',
			pink: '#EE9ED3',
			purple: {
				DEFAULT: '#9723C9',
			}
		}
	},
	plugins: [],
}

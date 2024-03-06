/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			keyframes: {
				'viewport': {
					'0%': { width: 0, height: 0 },
					'100%': { width: '100%', height: '100%' },
				}
			},
			animation: {
				'viewport-after': 'viewport-after 2s ease-in forward',
				'viewport-before': 'viewport-before 2s ease-in forward'
			},
			boxShadow: {
				window: '6px 6px 0px 0px #000',
			},
		},
		fontFamily: {
			aktiv: ['aktiv-grotesk-extended', ...defaultTheme.fontFamily.sans],
			'recon-grotesk': ['BN Recon Grotesk', ...defaultTheme.fontFamily.sans],
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
			peach: {
				DEFAULT: '#FFAE92',
				light: '#f8f2ed'
			},
			pink: '#EE9ED3',
			purple: {
				DEFAULT: '#9723C9',
			}
		}
	},
	plugins: [],
}

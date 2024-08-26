/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			transitionTimingFunction: {
				'bounce': 'cubic-bezier(.51,.09,.38,1.34)',
			},
			keyframes: {
				'viewport': {
					'0%': { width: 0, height: 0 },
					'100%': { width: '100%', height: '100%' },
				}
			},
			animation: {
				'viewport-after': 'viewport-after 2s ease-in forward',
				'viewport-before': 'viewport-before 2s ease-in forward',
				'spin-slow': 'spin 5s linear infinite'
			},
			boxShadow: {
				window: '6px 6px 0px 0px #000',
				"link-box": '-3px 4px 0px 0px var(--black)',
			},
			cursor: {
				move: 'url(/assets/img/cursor-move.svg) 32 32, move',
				moving: 'url(/assets/img/cursor-moving.svg) 12 6, pointer',
			},
			borderWidth: {
				'border-width': 'var(--border-width)',
				'mobile-border-width': 'var(--mobile-border-width)',
			},
			width: {
				'border-width': 'var(--border-width)',
				'mobile-border-width': 'var(--mobile-border-width)',
			},
			height: {
				'dvh': 'calc(var(--dvh) * 100)',
				'border-width': 'var(--border-width)',
				'mobile-border-width': 'var(--mobile-border-width)',
			},
			spacing: {
				'13': '3.25rem',
				'14': '3.5rem',
				'border-width': 'var(--border-width)',
				'mobile-border-width': 'var(--mobile-border-width)',
				'var-top': 'var(--top)',
				'var-left': 'var(--left)',
			},
			zIndex: {
				'max': '10000',
				'9999': '9999',
				'9990': '9990',
				'9980': '9980',
			},
			strokeWidth: {
				'40': '40px',
			}
		},
		fontFamily: {
			aktiv: ['aktiv-grotesk-extended', ...defaultTheme.fontFamily.sans],
			'recon-grotesk': ['BN Recon Grotesk', ...defaultTheme.fontFamily.sans],
			'uncut': ['Uncut Sans', ...defaultTheme.fontFamily.sans],
			platform: ['Platform', ...defaultTheme.fontFamily.sans],
		},
		colors: {
			current: 'currentcolor',
			transparent: 'transparent',
			black: '#000',
			white: '#fff',
			yellow: {
				DEFAULT: '#FFDB58',
			},
			olive: {
				DEFAULT: "#516B35",
				light: "#929B87",
			},
			red: {
				DEFAULT: "#ae0c0c",
			},
			green: {
				DEFAULT: "#073F38",
			},
			grey: '#f5f5f5',
			peach: {
				DEFAULT: '#FFAE92',
				light: '#f8f2ed'
			},
			pink: '#EE9ED3',
			purple: {
				DEFAULT: '#9723C9',
				light: "#C1C5E0",
			}
		}
	},
	plugins: [],
}

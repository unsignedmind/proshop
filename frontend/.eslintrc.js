module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'plugin:react/recommended',
		'google',
		'plugin:react-hooks/recommended',
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'import'],
	rules: {
		'import/no-unresolved': [2, { commonjs: true, amd: true }],
		'import/named': 2,
		'import/namespace': 2,
		'import/default': 2,
		'import/export': 2,
		'no-console': 'error',
	},
};

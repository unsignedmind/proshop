module.exports = {
	extends: ['airbnb-base', 'prettier'],
	env: {
		es6: true,
		browser: true,
	},
	rules: {
		'max-len': ['error', 140],
		'brace-style': ['error', 'stroustrup'],
		'comma-dangle': ['error', 'never'],
		'no-unused-vars': ['warn'],
	},
};

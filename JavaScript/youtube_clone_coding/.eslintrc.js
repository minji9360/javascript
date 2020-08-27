module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: ["plugin:prettier/recommended", "airbnb-base"],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	rules: {
		indent: [4, "tab"],
	},
};

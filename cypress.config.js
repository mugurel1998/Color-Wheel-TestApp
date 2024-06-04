const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		baseUrl: "https://practice.expandtesting.com",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});

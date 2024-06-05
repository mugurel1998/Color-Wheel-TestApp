// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("rollTheWheel", () => {
	cy.get("#playBtn").click();
});

Cypress.Commands.add("getAllColors", () => {
	// cy.get("#answers > button").invoke("text").then((txt) => txt.toString())
	cy.window().then(win => {
		return cy.wrap(Array.from(win.document.querySelectorAll("#answers > button")).map(el => el.innerText));
	});
});

Cypress.Commands.add("getAnswerIndex", () => {
	return cy.get("#picker").should("have.attr", "style").then(style => {
		let angleString = style.replace(/.*\(/, "").replace(/deg\).*/, "");
		let angle = parseInt(angleString) % 360;
		let color = angle / 60;
		// this index increases when the index in
		//    color array decreases
		// now the color index should be offset by 4
		// and put back in [0, 6) range
		// 10 is the smallest number equals modulo 6
		//    with 4 and bigger than 6 
		let index = (10 - color) % 6
		return cy.wrap(index);
	});
});
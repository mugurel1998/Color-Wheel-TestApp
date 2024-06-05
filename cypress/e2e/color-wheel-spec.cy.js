
describe("Color Wheel test suite", () => {
	beforeEach(() => {
		cy.visit("/color-wheel");
	});
	
	it("Roll the wheel", () => {
		cy.rollTheWheel();
		cy.getAllColors().then(colors => {
			cy.getAnswerIndex().then(index => {
				cy.wait(1500).then(() => {
					cy.contains(colors[index], {matchCase: false}).click();
					cy.getAllColors().then(newColors => {
						// deep elementwise comparison
						expect(colors).to.not.deep.equal(newColors);
						cy.get("#result").should("have.value", "");
					});
				});
			});
		});
	});

	it("Pick a wrong color", () => {
		cy.rollTheWheel();
		cy.getAllColors().then(colors => {
			cy.getAnswerIndex().then(index => {
				cy.wait(1500).then(() => {
					let randomChoice = (arr) => arr[Math.floor(arr.length * Math.random())];
					// add anything between 1 and 5 and then mod 6
					let wrongIndex = (index + randomChoice([1, 2, 3, 4, 5])) % 6;
					cy.contains(colors[wrongIndex], {matchCase: false}).click();
					cy.getAllColors().then(newColors => {
						expect(colors).to.deep.equal(newColors);
						cy.contains("Incorrect Answer").should("be.visible");
					});
				});
			});
		});
	});
	
	it("Play 30 times", () => {
		cy.rollTheWheel();
		for(let i = 0; i < 30; ++i){
			cy.getAllColors().then(colors => {
				cy.getAnswerIndex().then(index => {
					cy.wait(10).then(() => {
						cy.contains(colors[index], {matchCase: false}).click();
						cy.getAllColors().then(newColors => {
							expect(colors).to.not.deep.equal(newColors);
							cy.get("#result").should("have.value", "");
						});
					});
				});
			});
		}
	});
});
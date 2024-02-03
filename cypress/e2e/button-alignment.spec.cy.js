describe('Button alignment test', () => {
    it('Checks if the hamburger button is aligned properly with the navbar', () => {
        cy.visit('http://localhost:3000');

        cy.get('body').should('be.visible');
        cy.get('Button').should(
            'have.class',
            'inline-flex items-center justify-center'
        );
    });
});

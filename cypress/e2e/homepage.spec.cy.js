describe('Page Load Time Test', () => {
    it('should measure page load time', () => {
        const urlToTest = 'http://localhost:3000';
        const startTime = Date.now();

        cy.visit(urlToTest);
        cy.get('body').should('be.visible');

        const endTime = Date.now();

        const pageLoadTime = endTime - startTime;
        cy.log(`Page load time: ${pageLoadTime}ms`);

        const maxLoadTime = 5000;
        expect(pageLoadTime).to.be.lessThan(maxLoadTime);
    });
});

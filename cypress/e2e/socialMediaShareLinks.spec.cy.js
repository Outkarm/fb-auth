describe('Social share buttons test', () => {
    // List of routes you want to test
    const routes = ['/', '/about', '/careers'];

    routes.forEach((route) => {
        it(`Should have social media share icons and contain text "Share" on ${route}`, () => {
            cy.visit(route);

            // Check if the h3 element contains the text "Share"
            cy.get('h3')
                .should('exist')
                .should('be.visible')
                .should('contain.text', 'Share');

            // Wait for the Twitter share link to exist, then check if it opens in a new tab
            cy.get('a[title="Share on Twitter"]')
                .should('exist')
                .should('have.attr', 'target', '_blank');

            // Wait for the LinkedIn share link to exist, then check if it opens in a new tab
            cy.get('a[title="Share on Linkedin"]')
                .should('exist')
                .should('have.attr', 'target', '_blank');

            // Wait for the Pinterest share link to exist, then check if it opens in a new tab
            cy.get('a[title="Share on Pinterest"]')
                .should('exist')
                .should('have.attr', 'target', '_blank');

            // Wait for the Email share link to exist, then check if it opens in a new tab
            cy.get('a[title="Share on Email"]')
                .should('exist')
                .should('have.attr', 'aria-label', 'Share on Email');
        });
    });
});

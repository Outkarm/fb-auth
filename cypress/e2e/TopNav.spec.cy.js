describe('Navigation bar test', () => {
    // List of routes you want to test
    const routes = [
        '/',
        '/about',
        '/careers',
        '/PrivacyPolicyPage',
        '/TermsOfUsePage',
        '/calendly',
    ];

    routes.forEach((route) => {
        it(`Should have a navigation bar on ${route}`, () => {
            cy.visit(route);
            cy.get('nav') // Assuming the navigation bar is wrapped in a <nav> element
                .should('exist')
                .should('be.visible');
        });
    });
});

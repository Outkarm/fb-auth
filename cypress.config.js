const startServer = require('start-server-and-test');

module.exports = {
    ...(on, config) => {
        on('before:run', async (details) => {
            await startServer({
                command: 'npm run dev',
                port: 3000,
            });
        });

        return config;
    },

    e2e: {
        baseUrl: 'http://localhost:3000',
        pageLoadTimeout: 60000,
        setupNodeEvents(on, config) {},
    },
};

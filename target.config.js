/**
 * Define the environment mode.
 * - preview: This mode is used for testing the application before deploying it to production. run "yarn build-preview" to build the application. run "yarn preview" to serve the application.
 * - development: This mode is used for developing the application.
 * - production: This mode is used for deploying the application to production.
 * - local: This mode is used for testing the application with local data.
 */
const isPreview = process.env.NODE_ENV === 'preview';
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalApi = false;

/**
 * If you want to make fake api calls, set isLocalMode to true and create a folder called "api" in the public directory, 
 * then create json files with the same name as the endpoint.
 */
const appURL = {
    dev: isLocalApi ? "https://localhost:5173" : "https://localhost.local",
    preview: isLocalApi ? "https://localhost:4173" : "https://localhost.local",
    production: "https://your-production-url.com",
}

/**
 * The config object is used to store global variables that can be accessed in any component.
 */
const config = {
    logger: true, // Enable logging in the console
    dev: isDevelopment,
    baseURL: isPreview ? appURL.preview : isDevelopment ? appURL.dev : appURL.production,
    api: {
        local: isLocalApi,
        baseURL: isPreview ?  appURL.preview : isDevelopment ? appURL.dev : appURL.production,
    },
    router: {
        // Enable Single Page Application mode (SPA) else it will just target all id="target-name" elements
        isSPAEnabled: true,
    },
    meta: {
        title: "Target.js",
        description: "A simple and lightweight JavaScript library for building web applications.",
    },
}

export default config;
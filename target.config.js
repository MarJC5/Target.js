const isPreviewMode = process.env.NODE_ENV === 'preview';
const isDevMode = process.env.NODE_ENV === 'development';
const isLocalMode = false;

const appURL = {
    dev: isLocalMode ? "https://localhost:5173" : "https://localhost.local",
    preview: isLocalMode ? "https://localhost:4173" : "https://localhost.local",
    production: "https://your-production-url.com",
}

const config = {
    logger: true, // Enable logging in the console
    dev: isDevMode,
    baseURL: isPreviewMode ? appURL.preview : isDevMode ? appURL.dev : appURL.production,
    api: {
        local: isLocalMode,
        baseURL: isPreviewMode ?  appURL.preview : isDevMode ? appURL.dev : appURL.production,
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
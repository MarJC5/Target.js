const isPreviewMode = process.env.NODE_ENV === 'preview';
const isDevMode = process.env.NODE_ENV === 'development';

export default {
    logger: true, // Enable logging in the console
    dev: isDevMode,
    baseURL: isPreviewMode ? "http://localhost:4173" : isDevMode ? "http://localhost:5173" : "https://your-production-url.com",
    api: {
        baseURL: isPreviewMode ? "http://localhost:4173" : isDevMode ? "http://localhost:5173" : "https://your-production-url.com",
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
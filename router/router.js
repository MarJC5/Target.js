/**
 * Defines a map for dynamically importing React-like targets based on container IDs.
 * This approach enables lazy-loading of targets only when they are needed, reducing initial load time.
 * The keys represent container element IDs and the values are functions that dynamically import the corresponding targets.
 *
 * @example
 * const targetRegistry = {
 *   "app": () => import("./path/to/target.js")
 * };
 */
const targetRegistry = {
    // Views
    "index": () => import("../src/components/views/Index.js"),
    "page": () => import("../src/components/views/Page.js"),
    "error-404": () => import("../src/components/views/Error404.js"),

    // Layouts
    "app": () => import("../src/components/partials/layouts/App.js"),
    "header": () => import("../src/components/partials/layouts/Header.js"),
    "footer": () => import("../src/components/partials/layouts/Footer.js"),
    "fluid-container": () => import("../src/components/partials/layouts/FluidContainer.js"),

    // UI
    "loading": () => import("../src/components/partials/ui/Loading.js"),
    "error": () => import("../src/components/partials/ui/Error.js"),

    // Targets

};

/**
 * Page path to target ID mapping.
 * This mapping helps in resolving the appropriate target ID based on the current path.
 */

const pathToTargetId = {
    "/": "index",
    "/{{slug}}": "page",
    "/error-404": "error-404",
};

export { targetRegistry, pathToTargetId };

import { componentsPath } from "../utils/index.js";

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
    "index": () => import(componentsPath("views/Index.js")),
    "error-404": () => import(componentsPath("views/Error404.js")),
    "page": () => import(componentsPath("views/Page.js")),

    // Partials
    "app": () => import(componentsPath("partials/layouts/App.js")),
    "header": () => import(componentsPath("partials/layouts/Header.js")),
    "footer": () => import(componentsPath("partials/layouts/Footer.js")),
    "fluid-container": () => import(componentsPath("partials/layouts/FluidContainer.js")),

    // Targets
    "hello-world": () => import(componentsPath("partials/parts/HelloWorld.js")),

    // UI
    "loading": () => import(componentsPath("partials/ui/Loading.js")),
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

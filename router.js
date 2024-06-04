import { componentsPath } from "./utils/index.js";

/**
 * Defines a map for dynamically importing React-like targets based on container IDs.
 * This approach enables lazy-loading of targets only when they are needed, reducing initial load time.
 * The keys represent container element IDs and the values are functions that dynamically import the corresponding targets.
 *
 * @example
 * // This example shows how to map an HTML element ID to a dynamic import of a target
 * const containersTarget = {
 *   "app": () => import("./path/to/target.js")
 * };
 */
const targetRegistry = {
    // Views
    "index-view": () => import(componentsPath("views/Page.js")),

    // Partials
    "app": () => import(componentsPath("partials/layouts/App.js")),
    "header": () => import(componentsPath("partials/layouts/Header.js")),
    "footer": () => import(componentsPath("partials/layouts/Footer.js")),

    // Targets
    "hello-world": () => import(componentsPath("partials/parts/HelloWorld.js")),
};

export { targetRegistry };
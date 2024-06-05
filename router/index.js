import { pathToTargetId } from "@router/router";

/**
 * Page path to target ID mapping.
 * This mapping helps in resolving the appropriate target ID based on the current path.
 */
const patterns = {
    slug: "[a-zA-Z0-9-]+",
    id: "[0-9]+",
};

/**
 * Replaces placeholders in the pathToTargetId keys with actual patterns.
 *
 * @param {string} pathPattern - The path pattern to replace placeholders in.
 * @returns {string} - The path pattern with placeholders replaced by regex patterns.
 */
const replacePlaceholders = (pathPattern) => {
    return pathPattern.replace(/{{(slug|id)}}/g, (_, key) => patterns[key]);
};

/**
 * Retrieves the target ID based on the current path.
 * If the path does not exist in the registry, it tries to match a pattern.
 * If no match is found, it defaults to 'error-404'.
 *
 * @param {string} path - The current path.
 * @returns {string} - The target ID corresponding to the path.
 */
const getPathTargetId = (path) => {
    // Format the path by removing any trailing slashes
    const formattedPath = path.replace(/\/$/, "") || "/";

    // Check if the formatted path exists in the pathToTargetId mapping
    if (pathToTargetId[formattedPath]) {
        return pathToTargetId[formattedPath];
    }

    // Check if the formatted path matches any pattern
    for (const [pattern, targetId] of Object.entries(pathToTargetId)) {
        const regexPattern = replacePlaceholders(pattern);
        const regex = new RegExp(`^${regexPattern}$`);
        if (regex.test(formattedPath)) {
            return targetId;
        }
    }

    // If no match is found, return 'error-404'
    console.error(`No target found for path: ${path}`);
    window.history.replaceState({}, "", "/error-404");
    return "error-404";
};

export { getPathTargetId };

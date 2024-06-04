/**
 * Converts a dataset object (like `element.dataset`) into a plain JavaScript object.
 * This function is useful for handling HTML data attributes.
 *
 * @param {Object} data - The dataset object to convert, typically `element.dataset`.
 * @returns {Object} A new object where each property corresponds to a data attribute.
 */
const datasetToObject = (data) => {
    if (!data) return {};

    return Object.entries(data).reduce((acc, [key, value]) => {
        if (value === "true" || value === "false") {
            acc[key] = value === "true";
        } else if (typeof value === "object" && value.length > 0) {
            acc[key] = datasetToObject(value);
        } else if (!isNaN(value)) {
            acc[key] = Number(value);
        } else if (value.startsWith("{") && value.endsWith("}")) {
            acc[key] = JSON.parse(value);
        } else {
            acc[key] = value;
        }
        return acc;
    });
};

/**
 * Resolves a full path to a file by appending the filename to a given path prefix.
 *
 * @param {string} filename - The name of the file to append to the path.
 * @param {string} path - The initial path to which the filename will be appended.
 * @returns {string} The full path string resulting from concatenating the path and filename.
 */
const resolvePath = (filename, path) => {
    return path + filename;
};

/**
 * Generates a path for a target file located in the 'src/targets/' directory.
 * This function utilizes `resolvePath` to construct the full path to a target file.
 *
 * @param {string} filename - The filename of the target.
 * @returns {string} The resolved path to the target file within the 'src/targets/' directory.
 */
const componentsPath = (filename) => {
    return resolvePath(filename, './src/components/');
};

/**
 * Generates a path for a utility file located in the 'src/assets/' directory.
 * This function utilizes `resolvePath` to construct the full path to a utility file.
 * 
 * @param {string} filename - The filename of the utility.
 * @returns {string} The resolved path to the utility file within the 'src/assets/' directory.
 */
const assetsPath = (filename) => {
    return resolvePath(filename, './src/assets/');
}

/**
 * Generates a path for a utility file located in the '/public/' directory.
 * This function utilizes `resolvePath` to construct the full path to a utility file.
 * 
 * @param {string} filename - The filename of the utility.
 * @returns {string} The resolved path to the utility file within the 'src/assets/' directory.
 */
const publicPath = (filename) => {
    return resolvePath(filename, './public/');
}

/**
 * Generates url path from a given path.
 * 
 * @param {string} path - The path to be converted.
 * @returns {string} The url path.
 */
const urlPath = (path) => {
    const newPath = path.replace('./', '/');
    return `${window.location.origin}${newPath}`;
}

export { datasetToObject, componentsPath, assetsPath, urlPath, publicPath };
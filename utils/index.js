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
        } else if (!isNaN(value)) {
            acc[key] = Number(value);
        } else if (value.startsWith("{") && value.endsWith("}")) {
            try {
                acc[key] = JSON.parse(value);
            } catch (e) {
                acc[key] = value;
            }
        } else {
            acc[key] = value;
        }
        return acc;
    }, {});
};


export { datasetToObject };
/**
 * Represents an HTTP request handler class. This class provides methods to perform
 * HTTP requests using the Fetch API, including support for default parameters and headers.
 */
export class HTTPRequest {
    /**
     * Constructs the HTTPRequest instance with default configurations.
     *
     * @param {string} apiURL - The base URL for the API requests.
     * @param {Object} defaultURLParams - Default URL parameters to be included in every request.
     * @param {Object} defaultHeaders - Default headers to be included in every request.
     */
    constructor(apiURL, defaultURLParams = {}, defaultHeaders = {}) {
        this.apiURL = apiURL;
        this.defaultURLParams = new URLSearchParams(defaultURLParams);
        this.defaultHeaders = new Headers(defaultHeaders);
    }

    /**
     * Performs an HTTP request using the Fetch API.
     *
     * @param {string} method - The HTTP method to use (GET, POST, PUT, DELETE, etc.).
     * @param {string} route - The API route path to append to the base URL.
     * @param {Object} urlParams - URL parameters to include in the request.
     * @param {Object} body - The body of the request for POST, PUT methods.
     * @param {Object} extraHeaders - Additional headers to include in the request.
     * @returns {Promise<Object>} A promise that resolves to the response in JSON format.
     */
    request(method, route, urlParams = {}, body = null, extraHeaders = {}) {
        // Merge URL parameters with defaults
        const params = new URLSearchParams(this.defaultURLParams);
        Object.entries(urlParams).forEach(([key, value]) => params.append(key, value));

        // Prepare headers
        const headers = new Headers(this.defaultHeaders);
        Object.entries(extraHeaders).forEach(([key, value]) => headers.append(key, value));

        // Prepare the request configuration
        const config = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        // Execute the request
        return fetch(`${this.apiURL}${route}?${params}`, config)
            .then(response => response.json().then(json => {
                if (!response.ok) {
                    const error = new Error("HTTP error");
                    error.response = response;
                    error.json = json;
                    throw error;
                }
                return { json, status: response.status, headers: response.headers };
            }));
    }

    /**
     * Performs a GET request.
     *
     * @param {string} route - The API route.
     * @param {Object} urlParams - URL parameters.
     * @param {Object} headers - Additional headers.
     * @returns {Promise<Object>} A promise that resolves to the response in JSON format.
     */
    get(route, urlParams = {}, headers = {}) {
        return this.request("GET", route, urlParams, undefined, headers);
    }

    /**
     * Performs a POST request.
     *
     * @param {string} route - The API route.
     * @param {Object} body - The body of the request.
     * @param {Object} urlParams - URL parameters.
     * @param {Object} headers - Additional headers.
     * @returns {Promise<Object>} A promise that resolves to the response in JSON format.
     */
    post(route, body = {}, urlParams = {}, headers = {}) {
        return this.request("POST", route, urlParams, body, headers);
    }

    /**
     * Performs a PUT request.
     *
     * @param {string} route - The API route.
     * @param {Object} body - The body of the request.
     * @param {Object} urlParams - URL parameters.
     * @param {Object} headers - Additional headers.
     * @returns {Promise<Object>} A promise that resolves to the response in JSON format.
     */
    put(route, body = {}, urlParams = {}, headers = {}) {
        return this.request("PUT", route, urlParams, body, headers);
    }

    /**
     * Performs a DELETE request.
     *
     * @param {string} route - The API route.
     * @param {Object} urlParams - URL parameters.
     * @param {Object} headers - Additional headers.
     * @returns {Promise<Object>} A promise that resolves to the response in JSON format.
     */
    delete(route, urlParams = {}, headers = {}) {
        return this.request("DELETE", route, urlParams, undefined, headers);
    }
}
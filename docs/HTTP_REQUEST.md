# HTTPRequest Documentation

The `HTTPRequest` class is a utility for performing HTTP requests using the Fetch API. It provides methods to perform various HTTP methods (GET, POST, PUT, DELETE) with support for default parameters and headers.

## Usage

### Importing HTTPRequest

```javascript
import { HTTPRequest } from '@utils/HTTPRequest';
```

### Creating an Instance

```javascript
const apiURL = 'https://api.example.com';
const defaultURLParams = { lang: 'en' };
const defaultHeaders = { 'Content-Type': 'application/json' };

const httpRequest = new HTTPRequest(apiURL, defaultURLParams, defaultHeaders);
```

### Performing HTTP Requests

#### GET Request

```javascript
/**
 * Performs a GET request.
 * @param {string} route - The API route.
 * @param {Object} urlParams - URL parameters.
 * @param {Object} headers - Additional headers.
 * @returns {Promise<Object>} A promise that resolves to the response in JSON format.
 */
httpRequest.get('/users', { page: 1 }, { Authorization: 'Bearer token' })
  .then(response => {
    console.log(response.json);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

#### POST Request

```javascript
/**
 * Performs a POST request.
 * @param {string} route - The API route.
 * @param {Object} body - The body of the request.
 * @param {Object} urlParams - URL parameters.
 * @param {Object} headers - Additional headers.
 * @returns {Promise<Object>} A promise that resolves to the response in JSON format.
 */
httpRequest.post('/users', { name: 'John Doe' }, {}, { Authorization: 'Bearer token' })
  .then(response => {
    console.log(response.json);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

#### PUT Request

```javascript
/**
 * Performs a PUT request.
 * @param {string} route - The API route.
 * @param {Object} body - The body of the request.
 * @param {Object} urlParams - URL parameters.
 * @param {Object} headers - Additional headers.
 * @returns {Promise<Object>} A promise that resolves to the response in JSON format.
 */
httpRequest.put('/users/1', { name: 'Jane Doe' }, {}, { Authorization: 'Bearer token' })
  .then(response => {
    console.log(response.json);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

#### DELETE Request

```javascript
/**
 * Performs a DELETE request.
 * @param {string} route - The API route.
 * @param {Object} urlParams - URL parameters.
 * @param {Object} headers - Additional headers.
 * @returns {Promise<Object>} A promise that resolves to the response in JSON format.
 */
httpRequest.delete('/users/1', {}, { Authorization: 'Bearer token' })
  .then(response => {
    console.log(response.json);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## Example Usage

```javascript
// Create an HTTPRequest instance
const apiURL = 'https://api.example.com';
const defaultURLParams = { lang: 'en' };
const defaultHeaders = { 'Content-Type': 'application/json' };
const httpRequest = new HTTPRequest(apiURL, defaultURLParams, defaultHeaders);

// Perform a GET request
httpRequest.get('/users')
  .then(response => {
    console.log('GET response:', response.json);
  })
  .catch(error => {
    console.error('GET error:', error);
  });

// Perform a POST request
httpRequest.post('/users', { name: 'John Doe' })
  .then(response => {
    console.log('POST response:', response.json);
  })
  .catch(error => {
    console.error('POST error:', error);
  });

// Perform a PUT request
httpRequest.put('/users/1', { name: 'Jane Doe' })
  .then(response => {
    console.log('PUT response:', response.json);
  })
  .catch(error => {
    console.error('PUT error:', error);
  });

// Perform a DELETE request
httpRequest.delete('/users/1')
  .then(response => {
    console.log('DELETE response:', response.json);
  })
  .catch(error => {
    console.error('DELETE error:', error);
  });
```

The `HTTPRequest` class provides a simple and flexible way to perform HTTP requests with default configurations for API interactions.

# StyleManager Documentation

The `StyleManager` class is a utility class for managing styles and linked stylesheets in a web application. It allows you to dynamically add, update, and remove styles and linked stylesheets from the document head, ensuring that styles are applied and removed as needed.

## Usage

### Importing StyleManager

```javascript
import { StyleManager } from '@core/StyleManager';
```

### Creating an Instance

```javascript
const styleManager = new StyleManager();
```

### Adding and Removing Styles

#### Add or Update a Style

```javascript
/**
 * Adds or updates a style element in the document head.
 * @param {string} key - A unique identifier for the target-related style.
 * @param {object} css - The CSS rules to be applied.
 */
styleManager.addStyle('unique-key', {
  'body': 'background-color: #f0f0f0;',
  'h1': 'color: #333;'
});
```

#### Remove a Style

```javascript
/**
 * Removes a style element from the document head.
 * @param {string} key - The unique identifier for the target-related style to be removed.
 */
styleManager.removeStyle('unique-key');
```

### Loading and Removing Linked Stylesheets

#### Load a Linked Stylesheet

```javascript
/**
 * Loads a CSS file and adds it to the document head as a linked stylesheet.
 * @param {string} filename - The name of the CSS file to load.
 */
styleManager.loadLinkedStyle('styles.css');
```

#### Remove a Linked Stylesheet

```javascript
/**
 * Removes a linked stylesheet from the document head.
 * @param {string} filename - The name of the CSS file to remove.
 */
styleManager.removeLinkedStyle('styles.css');
```

### Injecting and Removing External Linked Stylesheets

#### Inject an External Linked Stylesheet

```javascript
/**
 * Injects an external linked stylesheet into the document head.
 * @param {string} rel - The relationship between the current document and the linked stylesheet.
 * @param {string} href - The URL of the linked stylesheet.
 * @param {string} crossorigin - The crossorigin attribute for the link element.
 */
styleManager.injectLinkedStyle('stylesheet', 'https://example.com/styles.css', 'anonymous');
```

#### Remove an Injected Linked Stylesheet

```javascript
/**
 * Removes an injected linked stylesheet from the document head.
 * @param {string} href - The URL of the linked stylesheet.
 */
styleManager.removeInjectedLinkedStyle('https://example.com/styles.css');
```

### Checking if Styles are Loaded

#### Check if a Style is Loaded

```javascript
/**
 * Checks if a style is already loaded.
 * @param {string} key - The unique identifier for the target-related style.
 * @returns {boolean} - A boolean indicating whether the style is already loaded.
 */
const isLoaded = styleManager.isStyleLoaded('unique-key');
```

#### Check if a Linked Stylesheet is Loaded

```javascript
/**
 * Checks if a linked stylesheet is already loaded.
 * @param {string} filename - The name of the CSS file.
 * @returns {boolean} - A boolean indicating whether the linked stylesheet is already loaded.
 */
const isLinkedStyleLoaded = styleManager.isLinkedStyleLoaded('styles.css');
```

#### Check if an Injected Linked Stylesheet is Loaded

```javascript
/**
 * Checks if an injected linked stylesheet is already loaded.
 * @param {string} href - The URL of the linked stylesheet.
 * @returns {boolean} - A boolean indicating whether the linked stylesheet is already loaded.
 */
const isInjectedLinkedStyleLoaded = styleManager.isInjectedLinkedStyleLoaded('https://example.com/styles.css');
```

### Removing All Styles

```javascript
/**
 * Removes all styles and linked styles from the document head.
 */
styleManager.removeAllStyles();
```

## Example Usage

```javascript
// Create an instance of StyleManager
const styleManager = new StyleManager();

// Add a style
styleManager.addStyle('example-style', {
  'body': 'background-color: #f0f0f0;',
  'h1': 'color: #333;'
});

// Check if the style is loaded
console.log(styleManager.isStyleLoaded('example-style')); // true

// Remove the style
styleManager.removeStyle('example-style');

// Load a linked stylesheet
styleManager.loadLinkedStyle('styles.css');

// Inject an external linked stylesheet
styleManager.injectLinkedStyle('stylesheet', 'https://example.com/styles.css');

// Check if the external linked stylesheet is loaded
console.log(styleManager.isInjectedLinkedStyleLoaded('https://example.com/styles.css')); // true

// Remove the external linked stylesheet
styleManager.removeInjectedLinkedStyle('https://example.com/styles.css');

// Remove all styles
styleManager.removeAllStyles();
```

The `StyleManager` class provides a flexible and powerful way to manage styles in your web application. By dynamically adding, updating, and removing styles, you can ensure that your application's UI is always consistent and up-to-date.

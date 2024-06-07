# HeadManager Documentation

The `HeadManager` class is a utility class for managing the `<head>` section of a web document. It allows you to dynamically add, update, and remove meta tags, link tags, and set the document title and language.

## Usage

### Importing HeadManager

```javascript
import { HeadManager } from '@core/HeadManager';
import config from '@/target.config';
```

### Creating an Instance

```javascript
const headManager = new HeadManager(document.head);
```

### Managing Meta Tags

#### Add a Meta Tag

```javascript
/**
 * Adds a meta tag to the head.
 * @param {Object} meta - The meta tag object.
 */
headManager.addMeta({
  name: 'description',
  content: 'This is a description.'
});
```

#### Remove a Meta Tag

```javascript
/**
 * Removes a meta tag from the head.
 * @param {Object} meta - The meta tag object.
 */
headManager.removeMeta({
  name: 'description'
});
```

#### Update a Meta Tag

```javascript
/**
 * Updates a meta tag in the head.
 * @param {Object} meta - The meta tag object.
 */
headManager.updateMeta({
  name: 'description',
  content: 'This is an updated description.'
});
```

### Managing Link Tags

#### Add a Link Tag

```javascript
/**
 * Adds a link tag to the head.
 * @param {Object} link - The link tag object.
 */
headManager.addLink({
  rel: 'stylesheet',
  href: 'styles.css'
});
```

#### Remove a Link Tag

```javascript
/**
 * Removes a link tag from the head.
 * @param {Object} link - The link tag object.
 */
headManager.removeLink({
  href: 'styles.css'
});
```

### Setting the Document Title

```javascript
/**
 * Sets the title of the document.
 * @param {string} title - The title of the document.
 */
headManager.setTitle('New Page Title');
```

### Setting the Document Language

```javascript
/**
 * Sets the language of the document.
 * @param {string} language - The language code.
 */
headManager.setLanguage('en');
```

## Example Usage

```javascript
// Create an instance of HeadManager
const headManager = new HeadManager(document.head);

// Add a meta tag
headManager.addMeta({
  name: 'description',
  content: 'This is a description.'
});

// Update the meta tag
headManager.updateMeta({
  name: 'description',
  content: 'This is an updated description.'
});

// Remove the meta tag
headManager.removeMeta({
  name: 'description'
});

// Add a link tag
headManager.addLink({
  rel: 'stylesheet',
  href: 'styles.css'
});

// Remove the link tag
headManager.removeLink({
  href: 'styles.css'
});

// Set the document title
headManager.setTitle('New Page Title');

// Set the document language
headManager.setLanguage('en');
```

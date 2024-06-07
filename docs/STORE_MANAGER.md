# Store Documentation

The `Store` class is a utility for managing application state. It provides methods to manage state, persist it in session storage, and notify subscribers about state changes. This class is designed to be extended for different parts of your application, such as user authentication, shopping cart, etc.

## Usage

### Importing Store

```javascript
import { Store } from '@path/to/Store';
```

### Creating an Instance

```javascript
const initialState = { user: null, cart: [] };
const store = new Store(initialState, 'appState');
```

### Managing State

#### Get Current State

```javascript
/**
 * Gets the current state of the store.
 * @returns {Object} The current state.
 */
const currentState = store.getState();
console.log(currentState);
```

#### Set New State

```javascript
/**
 * Sets the new state and notifies listeners about the state change.
 * The new state is merged with the current state.
 * @param {Object} newState - The new state to set.
 */
store.setState({ user: { name: 'John Doe' } });
```

### Subscribing to State Changes

#### Subscribe to State Changes

```javascript
/**
 * Subscribes a listener to state changes.
 * The listener is called with the current state whenever it changes.
 * @param {Function} listener - The listener function to subscribe.
 * @returns {Function} A function to unsubscribe the listener.
 */
const unsubscribe = store.subscribe(newState => {
  console.log('State updated:', newState);
});
```

#### Unsubscribe from State Changes

```javascript
// Unsubscribe from state changes
unsubscribe();
```

## Example Usage

```javascript
// Define initial state
const initialState = {
  user: { name: 'Jane Doe', email: 'jane@example.com' },
  cart: [{ id: 1, name: 'Product 1', quantity: 1 }]
};

// Create a store instance
const store = new Store(initialState, 'appState');

// Get the current state
console.log('Initial state:', store.getState());

// Subscribe to state changes
const unsubscribe = store.subscribe(newState => {
  console.log('State updated:', newState);
});

// Update the state
store.setState({ user: { name: 'John Doe', email: 'john@example.com' } });

// Unsubscribe from state changes
unsubscribe();
```

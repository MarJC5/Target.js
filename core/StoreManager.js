/**
 * Class representing a state store.
 * This class provides methods to manage state, persist it in session storage,
 * and notify subscribers about state changes.
 */
export class Store {
    /**
     * Creates a store instance with initial state and storage key.
     * @param {Object} initialState - The initial state of the store.
     * @param {string} storageKey - The key used to store state in session storage.
     */
    constructor(initialState = {}, storageKey = 'storeState') {
      this.state = initialState;
      this.listeners = [];
      this.storageKey = storageKey;
      this.loadStateFromSessionStorage();
    }
  
    /**
     * Loads the state from session storage.
     * If state exists in session storage, it overwrites the initial state.
     */
    loadStateFromSessionStorage() {
      const savedState = sessionStorage.getItem(this.storageKey);
      if (savedState) {
        this.state = JSON.parse(savedState);
      }
    }
  
    /**
     * Saves the current state to session storage.
     */
    saveStateToSessionStorage() {
      sessionStorage.setItem(this.storageKey, JSON.stringify(this.state));
    }
  
    /**
     * Gets the current state of the store.
     * @returns {Object} The current state.
     */
    getState() {
      return this.state;
    }
  
    /**
     * Sets the new state and notifies listeners about the state change.
     * The new state is merged with the current state.
     * @param {Object} newState - The new state to set.
     */
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.saveStateToSessionStorage();
      this.notifyListeners();
    }
  
    /**
     * Notifies all subscribed listeners about the state change.
     */
    notifyListeners() {
      this.listeners.forEach(listener => listener(this.state));
    }
  
    /**
     * Subscribes a listener to state changes.
     * The listener is called with the current state whenever it changes.
     * @param {Function} listener - The listener function to subscribe.
     * @returns {Function} A function to unsubscribe the listener.
     */
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  }
  
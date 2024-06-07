import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import config from '@/target.config';

class AuthManager {
  constructor(secret, initialState = {}, storageKey = 'authState') {
    this.secret = secret;
    this.state = initialState;
    this.listeners = [];
    this.storageKey = storageKey;
    this.loadStateFromSessionStorage();
  }

  loadStateFromSessionStorage() {
    const savedState = sessionStorage.getItem(this.storageKey);
    if (savedState) {
      this.state = JSON.parse(savedState);
    }
  }

  saveStateToSessionStorage() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.saveStateToSessionStorage();
    this.notifyListeners();
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Creates a JWT token.
   * @param {Object} payload - The payload to include in the token.
   * @param {string} expiresIn - The expiration time for the token.
   * @returns {string} The JWT token.
   */
  createToken(payload, expiresIn = import.meta.env.VITE_APP_JWT_EXPIRES_IN) {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  /**
   * Decodes a JWT token.
   * @param {string} token - The JWT token to decode.
   * @returns {Object} The decoded token payload.
   */
  decodeToken(token) {
    return jwt_decode(token);
  }

  /**
   * Logs in the user by storing the JWT token and user information in session storage.
   * @param {string} token - The JWT token.
   * @param {string} refreshToken - The refresh token.
   * @param {Object} user - The user information.
   */
  login(token, refreshToken, user) {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('authUser', JSON.stringify(user));
  }

  /**
   * Logs out the user by removing the JWT token and user information from session storage.
   */
  logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('authUser');
  }

  /**
   * Gets the stored JWT token.
   * @returns {string|null} The JWT token, or null if not found.
   */
  getToken() {
    return sessionStorage.getItem('authToken');
  }

  /**
   * Gets the stored refresh token.
   * @returns {string|null} The refresh token, or null if not found.
   */
  getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
  }

  /**
   * Gets the stored user information.
   * @returns {Object|null} The user information, or null if not found.
   */
  getUser() {
    const user = sessionStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Checks if the user is authenticated by verifying the presence and validity of the JWT token.
   * @returns {boolean} True if the user is authenticated, false otherwise.
   */
  isAuthenticated() {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken = this.decodeToken(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  }

  /**
   * Refreshes the JWT token using the refresh token.
   * @returns {Promise<string>} A promise that resolves with the new JWT token.
   */
  async refreshToken() {
    if (!config.auth.jwt.refreshToken.enabled) {
      throw new Error('Refresh token is not enabled');
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    // Replace with your API endpoint to refresh the token
    const response = await fetch(config.auth.jwt.refreshToken.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    const { token, user } = data;
    this.login(token, refreshToken, user);

    return token;
  }
}

export default new AuthManager(import.meta.env.VITE_APP_JWT_SECRET);

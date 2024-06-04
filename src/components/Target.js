import { HTTPRequest } from "../../utils/HTTPRequest.js";
import { StyleManager } from "./StyleManager.js";

/**
 * Utility function to render a target into a DOM container.
 * After rendering the target's output into the container, it triggers the targetDidMount lifecycle method.
 *
 * @param {Target} target - The target instance to be rendered.
 * @param {HTMLElement} container - The DOM element where the target should be rendered.
 */
const render = (target, container) => {
  const output = target.render();
  container.innerHTML = output;
  target.targetDidMount();
};

/**
 * Base class for creating targets.
 * It provides lifecycle methods, state management, and a fetch utility for API requests.
 */
class Target {
  /**
   * Target constructor.
   * Initializes the target with properties, state, and a container.
   *
   * @param {Object} props - Initial properties of the target passed as an object.
   * @param {HTMLElement} container - The container in which the target should be rendered.
   */
  constructor(props, container) {
    this.props = props;
    this.state = {};
    this.container = container;
    this.parent = null;
    this.api = null;
    this.isMounted = false;
    this.styleManager = new StyleManager();
  }

  /**
   * Initializes the target by extracting data attributes from the container.
   * To clean up the container, it removes the data attributes after extracting them.
   */
  initialize() {
    this.container.querySelectorAll("[data-target-name]").forEach((el) => {
      Object.keys(el.dataset).forEach((key) => {
        this.props[key] = el.dataset[key];
        el.removeAttribute(`data-${key}`);
      });
    });
  }

  /**
   * Get yield data from the parent target.
   * @param {string} targetName - The name of the parent target.
   * @returns {Object} - The yield data from the parent target.
   */
  getNestedTargets(nestedTargets) {
    if (nestedTargets) {
      const formatted = [];
      Object.entries(nestedTargets).reduce((acc, [key, value]) => {
        if (value) {
          const element = document.createElement(value.container);
          element.setAttribute("data-target-name", key);
          if (value.data) {
            Object.entries(value.data).forEach(([dataKey, dataValue]) => {
              element.setAttribute(`data-${dataKey}`, dataValue);
            });
          }
          formatted.push(element.outerHTML);
        }
        return acc;
      }, []);

      return formatted.join(" ");
    }
  }

  /**
   * Sets the parent container of the target.
   */
  setParent(parent) {
    this.parent = parent;
  }

  /**
   * Sets the target's state and triggers an update.
   *
   * @param {Object} newState - An object representing the new state of the target.
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  /**
   * Initializes a new HTTPRequest object for API calls.
   *
   * @param {string} apiURL - The base URL for the API.
   * @param {Object} defaultURLParams - Default URL parameters as an object.
   * @param {Object} defaultHeaders - Default headers for the API requests as an object.
   * @returns {HTTPRequest} - An instance of HTTPRequest configured for API interactions.
   */
  fetch(apiURL, defaultURLParams = {}, defaultHeaders = {}) {
    this.api = new HTTPRequest(apiURL, defaultURLParams, defaultHeaders);
    return this.api;
  }

  /**
   * A lifecycle method called after the target is first rendered.
   * To be overridden in subclasses as needed.
   */
  targetDidMount() {}

  /**
   * A lifecycle method called after the target's state is updated.
   * To be overridden in subclasses as needed.
   */
  targetDidUpdate() {}

  /**
   * Renders the target's HTML.
   * Should be overridden by subclasses to return HTML as a string.
   *
   * @returns {string} - HTML string representing the target's UI.
   */
  render() {
    return "";
  }

  /**
   * Updates the target by re-rendering its content and managing lifecycle hooks.
   */
  update() {
    if (this.container) {
      this.container.innerHTML = this.render();
      if (!this.isMounted) {
        this.targetDidMount();
        this.isMounted = true;
      }
      this.targetDidUpdate();
    }
  }

  /**
   * Clears the target's content from its container.
   */
  unmount() {
    this.container.innerHTML = "";
  }

  /**
   * Completely removes the target and cleans up resources.
   */
  destroy() {
    this.unmount();
    this.container = null;
  }

  /**
   * Escapes HTML to prevent XSS attacks.
   *
   * @param {string} str - The string to escape.
   * @returns {string} - The escaped HTML string.
   */
  static escapeHTML(str) {
    if (typeof str !== "string") {
      console.error("escapeHTML: Argument is not a string.");
      return "";
    }

    return str.replace(
      /[&<>"']/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "{": "&lbrace;",
          "}": "&rbrace;",
        }[tag])
    );
  }

  /**
   * Parses a template string with placeholders, replacing them with provided values.
   *
   * @param {string} template - The template string containing placeholders.
   * @param {Object} placeholders - An object mapping placeholders to their values.
   * @returns {string} - The resulting string with placeholders replaced by actual values.
   */
  static parseHTML(template, placeholders = {}) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return typeof placeholders[key] !== "undefined"
        ? Target.escapeHTML(placeholders[key])
        : "";
    });
  }
}

export { render, Target };

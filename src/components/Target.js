import { HTTPRequest } from "@utils/HTTPRequest";
import { StyleManager } from "@components/StyleManager";
import config from "@/target.config";

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
    this.styleId = this.container.getAttribute("data-target-name");

    if (config.logger && config.dev && config.dev && this.container) {
      this.log("Initialized target", { state: this.state, props: this.props, container: this.container });
    }
  }

   /**
   * Logs messages with different colors for each type of message.
   *
   * @param {string} message - The log message.
   * @param {Object} context - Additional context for the log.
   * @param {string} color - The color for the log message.
   */
   log(message, context = {}) {
    const colors = {
      'Initialized target': 'color: #f0fdf4; font-weight: bold',
      'Target will mount': 'color: #dcfce7; font-weight: bold',
      'Target did mount': 'color: #bbf7d0; font-weight: bold',
      'Target has mounted': 'color: #86efac; font-weight: bold',
      'Target did update': 'color: #4ade80; font-weight: bold',
      'Target updated': 'color: #22c55e; font-weight: bold',
      'Target will unmount': 'color: #fb7185; font-weight: bold',
      'Unmounting target': 'color: #f43f5e; font-weight: bold',
      'Created nested target': 'color: #06b6d4; font-weight: bold',
    };

    const titleColor = colors[message] || 'color: #166534; font-weight: bold';
    console.groupCollapsed(`%c[${this.constructor.name}] ${message}`, titleColor);
    console.log("State:", this.state);
    console.log("Props:", this.props);
    console.log("Container:", this.container);
    Object.entries(context).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    console.groupEnd();
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

    // Add comments with the target name for debugging purposes
    if (config.logger && config.dev) {
      const start = document.createComment(`Start of ${this.constructor.name}`);
      const end = document.createComment(`End of ${this.constructor.name}`);
      this.container.prepend(start);
      this.container.append(end);
    }
  }

  /**
   * Get data-target-name from the container.
   * @returns {string} - The name of the target.
   */
  getTargetName() {
    return this.container.getAttribute("data-target-name");
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
          if (value.containerClass) {
            element.classList.add(value.containerClass);
          }
          if (value.data) {
            Object.entries(value.data).forEach(([dataKey, dataValue]) => {
              element.setAttribute(`data-${dataKey}`, dataValue);
            });
          }

          if (config.logger && config.dev && this.container) {
            this.log("Created nested target", { element });
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
   * A lifecycle method called before the target is first rendered.
   * To be overridden in subclasses as needed.
   */
  targetWillMount() {
    if (config.logger && config.dev && this.container) {
      this.log("Target will mount");
    }
  }

  /**
   * A lifecycle method called after the target is first rendered.
   * To be overridden in subclasses as needed.
   */
  targetDidMount() {
    if (config.logger && config.dev && this.container) {
      this.log("Target has mounted");
    }
  }

  /**
   * A lifecycle method called after the target's state is updated.
   * To be overridden in subclasses as needed.
   */
  targetDidUpdate() {
    if (config.logger && config.dev && this.container) {
      this.log("Target did update");
    }
  }

  /**
   * A lifecycle method called before the target is unmounted.
   * To be overridden in subclasses as needed.
   */
  targetWillUnmount() {
    if (config.logger && config.dev && this.container) {
      this.log("Target will unmount");
    }
  }

  /**
   * Renders the target's HTML.
   * Should be overridden by subclasses to return HTML as a string.
   *
   * @returns {string} - HTML string representing the target's UI.
   */
  render() {
    if (config.logger && config.dev && this.container) {
      this.log("Rendering target");
    }
    return "";
  }

  /**
   * Updates the target by re-rendering its content and managing lifecycle hooks.
   */
  update() {
    if (this.container) {
      if (!this.isMounted) {
        this.targetWillMount();
      }
      this.container.innerHTML = this.render();
      if (!this.isMounted) {
        this.targetDidMount();
        this.isMounted = true;
      }
      this.targetDidUpdate();
    }

    if (config.logger && config.dev && this.container) {
      this.log("Target updated");
    }
  }

  /**
   * Clears the target's content from its container.
   */
  unmount() {
    if (config.logger && config.dev && this.container) {
      this.log("Unmounting target");
    }
    this.styleManager.removeAllStyles();
    this.container.innerHTML = "";
  }

  /**
   * Completely removes the target and cleans up resources.
   */
  destroy() {
    if (config.logger && config.dev && this.container) {
      this.log("Destroying target");
    }
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
    // Check if the argument is a number and convert it to a string
    if (typeof str === "number") {
      str = str.toString();
    }

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
        : match; // leave the placeholder intact
    });
  }

  /**
   * Helper function to minify HTML strings.
   *
   * @param {string} html - The HTML string to minify.
   * @returns {string} - The minified HTML string.
   */
  static minifyHTML = (html) => {
    return html.replace(/\s+/g, " ").trim();
  };

  /**
   * Converts a dataset object to a regular object.
   * This function is useful for handling HTML data attributes.
   * @param {Object} data - The dataset object to convert.
   * @returns {Object} - A new object where each property corresponds to a data attribute.
   */
  static dataToObject = (data) => {
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
}

export { render, Target };

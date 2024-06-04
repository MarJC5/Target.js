import { publicPath, urlPath } from '../../utils/index.js';

export class StyleManager {
    constructor() {
        this.styles = new Map();
    }

    /**
     * Adds or updates a style element in the document head.
     * @param {string} key - A unique identifier for the target-related style.
     * @param {object} css - The CSS rules to be applied.
     */
    addStyle(key, css) {
        let styleElement = this.styles.get(key);
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            document.head.appendChild(styleElement);
            this.styles.set(key, styleElement);
        }
        styleElement.innerHTML = Object.entries(css).map(([selector, rules]) => {
            // minify the CSS rules & check if the selector is empty
            rules = rules.replace(/\s*([:;,{])\s*/g, '$1');
            // avoid xss by escaping the selector
            selector = selector.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `${selector} { ${rules} }`;
        }).join('\n');
    }

    /**
     * Removes a style element from the document head.
     * @param {string} key - The unique identifier for the target-related style to be removed.
     */
    removeStyle(key) {
        const styleElement = this.styles.get(key);
        if (styleElement) {
            document.head.removeChild(styleElement);
            this.styles.delete(key);
        }
    }

    /**
     * Loads a CSS file and adds it to the document head as linked stylesheet.
     * @param {string} filename - The name of the CSS file to load.
     * @returns {Promise<void>} A promise that resolves when the CSS file is loaded and added to the document head.
     */
    loadLinkedStyle(filename) {
        const styleElement = document.createElement('link');
        styleElement.rel = 'stylesheet';
        styleElement.href = urlPath(publicPath(filename));
        document.head.appendChild(styleElement);
    }

    /**
     * Removes linked stylesheet from the document head.
     * @param {string} filename - The name of the CSS file to remove.
     */
    removeLinkedStyle(filename) {
        const styleElement = document.querySelector(`link[href="${urlPath(publicPath(filename))}"]`);
        if (styleElement) {
            document.head.removeChild(styleElement);
        }
    }

    /**
     * injects external linked stylesheet to the document head.
     * @param {string} rel - The relationship between the current document and the linked stylesheet.
     * @param {string} href - The URL of the linked stylesheet.
     */
    injectLinkedStyle(href = '', rel = '', crossorigin = '') {
        const styleElement = document.createElement('link');
        styleElement.rel = rel;
        styleElement.href = href;
        styleElement.crossOrigin = crossorigin;
        document.head.appendChild(styleElement);
    }

    /**
     * Removes linked stylesheet from the document head.
     */
    removeInjectedLinkedStyle(href = '') {
        const styleElement = document.querySelector(`link[href="${href}"]`);
        if (styleElement) {
            document.head.removeChild(styleElement);
        }
    }
}
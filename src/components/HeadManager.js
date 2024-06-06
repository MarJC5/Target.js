import config from "@/target.config";

export class HeadManager {
    /**
     * @param {Object} head - The head object.
     */
    constructor(head) {
        this.head = head;
    }

    /**
     * Adds a meta tag to the head.
     * @param {Object} meta - The meta tag object.
     */

    addMeta(meta) {
        const metaElement = document.createElement('meta');
        Object.entries(meta).forEach(([key, value]) => {
            metaElement.setAttribute(key, value);
        });
        this.head.appendChild(metaElement);

        return metaElement;
    }

    /**
     * Removes a meta tag from the head.
     * @param {Object} meta - The meta tag object.
     */

    removeMeta(meta) {
        const metaElement = this.head.querySelector(`meta[name="${meta.name}"]`);
        if (metaElement) {
            this.head.removeChild(metaElement);
        }
    }

    
    /**
     * Updates a meta tag in the head.
     * @param {Object} meta - The meta tag object.
     */
    updateMeta(meta) {
        const metaElement = this.head.querySelector(`meta[name="${meta.name}"]`);
        if (metaElement) {
            Object.entries(meta).forEach(([key, value]) => {
                metaElement.setAttribute(key, value);
            });
        }
    }

    /**
     * Adds a link tag to the head.
     * @param {Object} link - The link tag object.
     */
    addLink(link) {
        const linkElement = document.createElement('link');
        Object.entries(link).forEach(([key, value]) => {
            linkElement.setAttribute(key, value);
        });
        this.head.appendChild(linkElement);

        return linkElement;
    }

    /**
     * Removes a link tag from the head.
     * @param {Object} link - The link tag object.
     */
    removeLink(link) {
        const linkElement = this.head.querySelector(`link[href="${link.href}"]`);
        if (linkElement) {
            this.head.removeChild(linkElement);
        }

        return linkElement;
    }

    /**
     * Set the title of the head.
     * 
     * @param {string} title - The title of the head.
     */
    setTitle(title = config.meta.title) {
        if (!config.router.isSPAEnabled) {
            return;
        }

        if (title === config.meta.title) {
            document.title = title;
        } else if (title && title !== "") {
            document.title = `${config.meta.title} | ${title}`;
        }

        return document.title;
    }

    /**
     * Set the language of the head.
     * 
     * @param {string} language - The language code.
     */
    setLanguage(language) {
        document.documentElement.lang = language;

        return document.documentElement.lang;
    }
}
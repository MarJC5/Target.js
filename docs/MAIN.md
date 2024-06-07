# main.js Documentation

This script initializes and manages the rendering of targets in a web application, supporting both Single Page Application (SPA) mode and traditional multi-page mode. It dynamically loads and renders targets based on the current URL and DOM structure.

## Usage

### Importing Required Modules

```javascript
import { getPathTargetId } from "@router";
import { targetRegistry } from "@router/router";
import { datasetToObject } from "@utils";
import config from "@/target.config";
```

### Initialization on DOMContentLoaded

```javascript
document.addEventListener("DOMContentLoaded", function () {
  console.log("Target.js is running!");
  console.log("Single page mode:", config.router.isSPAEnabled);

  let currentTargetId = null;
  let currentTargetInstance = null;
```

### Render Page Function

The `renderPage` function is responsible for rendering the appropriate target based on the current URL.

```javascript
  const renderPage = async () => {
    const url = window.location;
    const path = url.pathname;
    const queryParams = new URLSearchParams(url.search);
    const targetId = getPathTargetId(path);

    if (targetId !== currentTargetId) {
      if (currentTargetInstance) {
        // Unmount the current target instance before rendering the new one
        currentTargetInstance.unmount();
      }

      currentTargetId = targetId;

      // Update the body ID
      document.body.id = targetId;

      // Clear the existing content if needed
      const container = document.getElementById(targetId);
      if (container) {
        container.innerHTML = "";
      }

      // Does the key exist in the registry?
      const loadTarget = targetRegistry[targetId];
      if (loadTarget) {
        currentTargetInstance = await renderTarget(
          targetId,
          loadTarget,
          path,
          queryParams
        );
      }
    }
  };
```

### Render Child Target Function

The `renderChildTarget` function renders child targets within a parent container by looking for elements with the `data-target-name` attribute.

```javascript
  /**
   * Render child targets by looking the HTML string for their root element
   * Look for <target name="target-name"/> inside the parent element and render the target corresponding to the name
   * @param {HTMLElement} parentContainer - The parent container element
   * @param {string} path - The current path
   * @param {URLSearchParams} queryParams - The query parameters
   * @returns {Promise<void>}
   */
  const renderChildTarget = async (parentContainer, path, queryParams) => {
    const elements = parentContainer.querySelectorAll("[data-target-name]");
    if (elements.length > 0) {
      await Promise.all(
        [...elements].map(async (element) => {
          const targetId = element.getAttribute("data-target-name");
          const props = datasetToObject(element.dataset);
          props.path = path;
          props.queryParams = queryParams.toString();

          if (targetRegistry[targetId]) {
            try {
              const { default: Target } = await targetRegistry[targetId]();
              const target = new Target(props, element);
              target.setParent(parentContainer.id);
              target.update();

              // Render child targets
              await renderChildTarget(element, path, queryParams);

              // Clean up the container
              target.initialize();
            } catch (error) {
              console.error(`Error loading target ${targetId}:`, error);
            }
          }
        })
      );
    }
  };
```

### Render Target Function

The `renderTarget` function loads and renders a target based on its ID.

```javascript
  /**
   * Render targets by looking the DOM for their root element
   * Look for id="target-name" and render the target corresponding to the name
   * @param {string} targetId - The id of the target
   * @param {function} loadTarget - The function to load the target
   * @param {string} path - The current path
   * @param {URLSearchParams} queryParams - The query parameters
   * @returns {Promise<void>}
   */
  const renderTarget = async (targetId, loadTarget, path, queryParams) => {
    const element = document.getElementById(targetId);

    if (element) {
      // Load parent target
      const props = datasetToObject(element.dataset);
      props.path = path;
      props.queryParams = queryParams.toString();

      try {
        const { default: Target } = await loadTarget();
        const target = new Target(props, element);
        target.update();

        // Render child targets
        await renderChildTarget(element, path, queryParams);

        // Clean up the container
        target.initialize();
        return target;
      } catch (error) {
        console.error(`Error loading target ${targetId}:`, error);
      }
    }
  };
```

### SPA Mode Handling

If SPA mode is enabled, set up navigation handling and initial rendering.

```javascript
  if (config.router.isSPAEnabled) {
    const navigateTo = (url) => {
      history.pushState(null, null, url);
      renderPage();
    };

    window.addEventListener("popstate", renderPage);

    // Event delegation for navigation links
    document.addEventListener("click", (event) => {
      if (event.target.matches("[data-link]")) {
        event.preventDefault();
        navigateTo(event.target.href);
      }
    });
  }

  if (config.router.isSPAEnabled) {
    // Initial render
    renderPage();
  } else {
    // Render all targets
    Object.keys(targetRegistry).forEach(async (targetId) => {
      const loadTarget = targetRegistry[targetId];
      await renderTarget(targetId, loadTarget, window.location.pathname, new URLSearchParams(window.location.search));
    });
  }
});
```

## Functions

### `renderPage`

Responsible for determining the current path, identifying the appropriate target, and rendering it. If the target has changed, it unmounts the previous target and loads the new one.

### `renderChildTarget`

Renders child targets within a given parent container by looking for elements with the `data-target-name` attribute and dynamically loading the corresponding target.

### `renderTarget`

Finds the target element in the DOM, loads the target, sets its properties, and renders it. This function also handles rendering child targets within the parent target.

### SPA Mode Handling

When SPA mode is enabled, this script listens for navigation events and dynamically updates the page content without a full page reload. It uses the `history` API to manage browser history and URL changes.

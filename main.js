import { getPathTargetId } from "./router/index.js";
import { targetRegistry } from "./router/router.js";
import { datasetToObject } from "./utils/index.js";
import config from "./target.config.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Target.js is running!");
  console.log("Single page mode:", config.router.isSPAEnabled);

  let currentTargetId = null;
  let currentTargetInstance = null;

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

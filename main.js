import { targetRegistry } from "./router.js";
import { datasetToObject } from "./utils/index.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Target.js is running!");

  const url = window.location;
  const path = url.pathname;
  const queryParams = new URLSearchParams(url.search);

  /**
   * Render child targets by looking the html string for their root element
   * Look for <target name="target-name"/> inside the parent element and render the target corresponding to the name
   * @param {HTMLElement} parentContainer - The parent container element
   * @returns {Promise<void>}
   */
  const renderChildTarget = async (parentContainer) => {
    const elements = parentContainer.querySelectorAll('[data-target-name]');
    if (elements.length > 0) {
      await Promise.all(
        [...elements].map(async (element) => {
          const targetId = element.getAttribute("data-target-name");
          const props = datasetToObject({ ...element.dataset, path, queryParams });
          if (targetRegistry[targetId]) {
            try {
              const { default: Target } = await targetRegistry[targetId]();
              const target = new Target(props, element);
              target.setParent(parentContainer.id);
              target.update();

              // render child targets
              await renderChildTarget(element);

              // clean up the container
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
   * @returns {Promise<void>}
   */
  const renderTarget = async (targetId, loadTarget) => {
    const element = document.getElementById(targetId);

    if (element) {
      // load parent target
      const props = datasetToObject({ ...element.dataset, path, queryParams });
      try {
        const { default: Target } = await loadTarget();
        const target = new Target(props, element);
        target.update();

        // render child targets
        await renderChildTarget(element);

        // clean up the container
        target.initialize();
      } catch (error) {
        console.error(`Error loading target ${targetId}:`, error);
      }
    }
  }

  /**
   * Iterate over the target IDs and render them if their root element exists
   * This allows us to only load the targets we need on the page
   */
  Object.entries(targetRegistry).forEach(async ([id, loadTarget]) => {
    if (document.getElementById(id)) {
      // console.info(`Rendering ${id} target`);
      await renderTarget(id, loadTarget);
    }
  });
});

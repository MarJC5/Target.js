import { Target } from "../Target.js";
import { HeadManager } from "../HeadManager.js";

class Page extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
    this.head = new HeadManager(document.head);
  }

  targetDidMount() {
    console.log("Target has mounted: Page");

    this.head.setTitle("Target.js");
  }

  targetDidUpdate() {
    console.log("Target did update: Page");
  }

  render() {
    const yieldElement = new Object({
      nestedTargets: {
        "hello-world": {
          container: "div",
          data: {
            name: "Target.js",
          },
        },
      },
    })

    const html = `
      <div data-target-name="app" data-yield='${JSON.stringify(yieldElement)}'></div>
    `;

    return Target.parseHTML(html, {});
  }
}

export default Page;

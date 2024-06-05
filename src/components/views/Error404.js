import { Target } from "../Target.js";
import { HeadManager } from "../HeadManager.js";

class Error404 extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
    this.head = new HeadManager(document.head);
  }

  targetDidMount() {
    this.head.setTitle("Error 404 - Page not found");
  }

  render() {
    const yieldElement = new Object({
      nestedTargets: {
        "fluid-container": {
          container: "div",
          containerClass: "row",
          data: {
            content: JSON.stringify({
              title: "Error 404: Page Not Found",
              content: "The page you are looking for does not exist. Please check the URL and try again."          
            }),
            css: JSON.stringify({}), // Add Inline CSS to the head
            links: JSON.stringify({}), // Add links to the head
            html: Target.minifyHTML(`
              <h1>{{title}}</h1>
              <p>{{content}}</p>
            `),
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

export default Error404;

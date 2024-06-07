import { Target } from "@core/Target";
import { HeadManager } from "@core/HeadManager";
import config from "@/target.config";

class IndexPage extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
    this.head = new HeadManager(document.head);
  }

  targetDidMount() {
    this.head.setTitle("Home");
  }

  render() {
    const yieldElements = [
      {
        name: "fluid-container",
        config: {
          container: "div",
          containerClass: ["row"],
          data: {
            api: JSON.stringify({
              url: config.api.baseURL + '/api/page',
              endpoint: config.api.local ? `/home.json` : `/home`,
              headers: JSON.stringify({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              }),
            }),
            title: true,
            css: JSON.stringify({}), // Add Inline CSS to the head
            links: JSON.stringify({}), // Add links to the head
            html: Target.minifyHTML(`
              <h1 class="the-title">Hello, Target.js</h1>
              <h2 class="the-subtitle">{{title}}</h2>
              <div class="the-content w-half">{{content}}</div>
            `),
          },
        }
      },
    ];

    const html = `
      <div data-target-name="app" data-yield='${this.yieldElementString(yieldElements)}'></div>
    `;

    return Target.parseHTML(html, {});
  }
}

export default IndexPage;

import { Target } from "@components/Target";
import config from "@/target.config";
import { HeadManager } from "@components/HeadManager";

class Page extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
    this.head = new HeadManager(document.head);
  }

  render() {
    const yieldElement = new Object({
      nestedTargets: {
        "fluid-container": {
          container: "div",
          containerClass: "row",
          data: {
            api: JSON.stringify({
              url: config.api.baseURL + '/api/pages',
              endpoint: `${this.props.path}.json`,
              headers: JSON.stringify({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              }),
            }),
            title: true,
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

export default Page;

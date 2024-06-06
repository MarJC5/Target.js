import { Target } from "@components/Target";
import config from "@/target.config";

class Page extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  render() {
    const yieldElement = new Object({
      nestedTargets: {
        "fluid-container": {
          container: "div",
          containerClass: "row",
          data: {
            api: JSON.stringify({
              url: config.api.baseURL + '/api/page',
              endpoint: config.api.local ? `${this.props.path}.json` : `${this.props.path}`,
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

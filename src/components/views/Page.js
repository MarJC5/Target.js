import { Target } from "@core/Target";
import config from "@/target.config";

class Page extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
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
              url: config.api.baseURL + "/api/page",
              endpoint: config.api.local
                ? `${this.props.path}.json`
                : `${this.props.path}`,
              headers: JSON.stringify({
                "Content-Type": "application/json",
                Accept: "application/json",
              }),
            }),
            title: true, // Add title to the head tag of the page
            css: JSON.stringify({}), // Add Inline CSS to the head
            links: JSON.stringify({}), // Add links to the head
            html: Target.minifyHTML(`
              <h1 class="the-title">{{title}}</h1>
              <div class="the-content w-half">{{content}}</div>
            `),
          },
        },
      },
      {
        name: "fluid-container",
        config: {
          container: "div",
          containerClass: ["row"],
          data: {
            scoped: true,
            css: JSON.stringify({
              ".the-title": `
                  font-size: 1.5rem;
                  color: ${`var(--${["red", "blue", "yellow", "green"][Math.floor(Math.random() * 4)]}-500)`};
              `,
              ".w-half": `
                  width: 50%;
                  padding: 1rem;
                  border: 1px solid #ddd;
              `,
              "@media (max-width: 768px)": {
                ".w-half": `
                      width: 100%;
                  `,
              },
            }), // Add Inline CSS to the head
            links: JSON.stringify({}), // Add links to the head
            html: Target.minifyHTML(`
              <div class="w-half">
                <h1 class="the-title">Another Fluid Container</h1>
                <div class="the-content">
                  <p>This is another fluid container. It is a sibling of the first fluid container, but without api data.
                  This is a good example of how to use multiple fluid containers in a single page.
                  <p>Notice that a css is apply independently to each fluid container because of the scoped attribute.</p>
                </div>
              </div>
            `),
          },
        },
      },
    ];

    const html = `
      <div data-target-name="app" data-yield='${this.yieldElementString(yieldElements)}'></div>
    `;

    return Target.parseHTML(html, {});
  }
}

export default Page;

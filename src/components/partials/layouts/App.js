import { Target } from "@components/Target";

class App extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {
      cssFile: "/assets/css/app.css",
      injectsLinks: [
        {
          link: "https://fonts.googleapis.com/css2?family=Reddit+Mono:wght@200..900&display=swap",
          rel: "stylesheet",
        },
        {
          link: "https://fonts.gstatic.com",
          rel: "preconnect",
          crossorigin: true,
        },
        {
          googleapis: "https://fonts.googleapis.com",
          rel: "preconnect",
        },
      ],
    };
  }

  targetWillMount() {
    this.state.injectsLinks.forEach((link) => {
      this.styleManager.injectLinkedStyle(
        link.link,
        link.rel,
        link.crossorigin ? "crossorigin" : ""
      );
    });
    this.styleManager.loadLinkedStyle(this.state.cssFile);
    this.styleManager.addStyle(this.styleId, css);
  }

  render() {
    const sharedData = new Object({
      title: "Target.js",
      github: "https://github.com/MarJC5/target.js",
    });
    const html = `
      <!-- Header -->
      <header data-target-name="header" data-content='${JSON.stringify(sharedData)}'></header>
      <!-- Main -->
      <main>
        ${this.getNestedTargets(this.props.yield.nestedTargets)}
      </main>
      <!-- Footer -->
      <footer data-target-name="footer" data-content='${JSON.stringify({
        ...sharedData,
        author: "MarJC5",
        copyright: new Date().getFullYear().toString(),
      })}'></footer>
    `;

    return Target.parseHTML(html, {});
  }
}

const css = {
  body: `
    font-family: "Reddit Mono", monospace;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  `,
  "body h1": `
    font-size: var(--text-5xl);
  `,
  "body h2": `
    font-size: var(--text-xl);
  `,
};

export default App;

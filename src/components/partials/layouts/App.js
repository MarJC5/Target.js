import { Target } from "../../Target.js";

class App extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {
      cssFile: "assets/css/app.css",
      injectsLinks: [{
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

      }],
    };
  }

  targetDidMount() {
    console.log("Target has mounted: App");
    this.state.injectsLinks.forEach((link) => {
      this.styleManager.injectLinkedStyle(link.link, link.rel, link.crossorigin ? 'crossorigin' : '');
    });
    this.styleManager.loadLinkedStyle(this.state.cssFile);
    this.styleManager.addStyle(this.container.id, css);
  }

  targetDidUpdate() {
    console.log("Target did update: App");
  }

  unmount() {
    this.state.injectLinkedStyles.forEach((link) => {
      this.styleManager.removeInjectedLinkedStyle(link.href);
    });
    this.styleManager.removeLinkedStyle(this.state.cssFile);
    this.styleManager.removeStyle(this.container.id);
  }

  render() {
    const sharedData = new Object({
        title: "Target.js",
        github: "https://github.com/MarJC5/target.js",
    })
    const html = `
      <header data-target-name="header" data-content='${JSON.stringify(sharedData)}'></header>
      <main>
        ${this.getNestedTargets(this.props.yield.nestedTargets)}
      </main>
      <footer data-target-name="footer" data-content='${JSON.stringify({...sharedData, author: 'MarJC5' })}'></footer>
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
  'body h1': `
    font-size: var(--text-5xl);
  `,
  'bodyh2': `
    font-size: var(--text-xl);
  `,
};

export default App;

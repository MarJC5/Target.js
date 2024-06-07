import { Target } from "@core/Target";

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
      inlineCSS: {
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
      },
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
    this.styleManager.addStyle(this.styleId, this.state.inlineCSS, this.hash, this.props.scoped ?? false);
  }

  render() {
    const sharedData = new Object({
      title: "Target.js",
      github: "https://github.com/MarJC5/target.js",
    });

    const yieldElements = [
      {
        name: "header",
        config: {
          container: "header",
          data: {
            content: JSON.stringify(sharedData),
          },
        },
      },
      {
        name: "fluid-container",
        config: {
          container: "main",
          data: {
            html: this.getNestedTargets(JSON.parse(this.props.yield)),
          },
        },
      },
      {
        name: "footer",
        config: {
          container: "footer",
          data: {
            content: JSON.stringify({
              ...sharedData,
              author: "MarJC5",
              copyright: new Date().getFullYear().toString(),
            }),
          },
        },
      },
    ];

    const html = `${this.getNestedTargets(yieldElements)}`;

    return Target.parseHTML(html, {});
  }
}

export default App;

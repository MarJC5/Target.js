import { Target } from "@core/Target";
class Header extends Target {
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
          containerClass: ["header", "row", "flex"],
          data: {
            css: JSON.stringify({
              ".header nav": `
                  gap: 1rem;
                `,
              ".header a": `
                  color: black;
                  text-decoration: none;
                `,
            }), // Add Inline CSS to the head
            html: Target.minifyHTML(`
              <a data-link href="/">{{title}}</a>
              <nav class="flex">
                  <a href="{{github}}">Github</a>
                  <a data-link href="/about">About</a>
              </nav>
            `),
          },
        },
      },
    ];

    const html = `${this.getNestedTargets(yieldElements)}`;

    return Target.parseHTML(html, Target.dataToObject(this.props.content));
  }
}

export default Header;

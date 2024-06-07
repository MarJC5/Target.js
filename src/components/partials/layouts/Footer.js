import { Target } from "@core/Target";

class Footer extends Target {
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
          containerClass: ["footer", "row"],
          data: {
            css: JSON.stringify({
              '.footer a': `
                color: black;
                text-decoration: none;
              `
            }), // Add Inline CSS to the head
            html: Target.minifyHTML(`
                <p>&copy; {{copyright}} - {{title}} by <a href="{{github}}">{{author}}</a></p>
            `),
          },
        },
      },
    ];

    const html = `${this.getNestedTargets(yieldElements)}`;

    return Target.parseHTML(html, Target.dataToObject(this.props.content));
  }
}

export default Footer;

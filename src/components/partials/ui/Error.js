import { Target } from "@core/Target";

class Error extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  targetWillMount() {
    if (!this.props.message) {
      this.props.message = "An error occurred.";
    }
  }

  render() {
    const yieldElements = [
      {
        name: "fluid-container",
        config: {
          container: "div",
          containerClass: ["error", "row"],
          data: {
            css: JSON.stringify({}), // Add Inline CSS to the head
            html: Target.minifyHTML(`
              <h1>{{title}}</h1>
              <p>{{message}}</p>
            `),
          },
        },
      },
    ];

    const html = `${this.getNestedTargets(yieldElements)}`;

    return Target.parseHTML(html, Target.dataToObject(this.props));
  }
}

const css = {};

export default Error;

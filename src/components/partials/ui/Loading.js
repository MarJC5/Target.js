import { Target } from "@core/Target";

class Loading extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  targetWillMount() {
    if (!this.props.message) {
      this.props.message = "Loading...";
    }
  }

  render() {
    const yieldElements = [
      {
        name: "fluid-container",
        config: {
          container: "div",
          containerClass: ["loading", "row"],
          data: {
            css: JSON.stringify({}), // Add Inline CSS to the head
            html: Target.minifyHTML(`
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

export default Loading;

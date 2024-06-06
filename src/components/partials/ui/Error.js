import { Target } from "@components/Target";

class Error extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  targetWillMount() {
    if (!this.props.message) {
      this.props.message = "An error occurred.";
    }

    if (css) {
      this.styleManager.addStyle(this.styleId, css);
    }
  }

  render() {
    const html = `
      <div class="error row">
        <h1>{{title}}</h1>
        <p>{{message}}</p>
      </div>
    `;

    return Target.parseHTML(html, Target.dataToObject(this.props));
  }
}

const css = {};

export default Error;

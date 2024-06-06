import { Target } from "@components/Target";

class Loading extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  targetWillMount() {
    if (!this.props.message) {
      this.props.message = "Loading...";
    }

    if (css) {
      this.styleManager.addStyle(this.styleId, css);
    }
  }

  render() {
    const html = `
      <div class="loading row">
        <p>{{message}}</p>
      </div>
    `;

    return Target.parseHTML(html, Target.dataToObject(this.props));
  }
}

const css = {};

export default Loading;

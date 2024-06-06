import { Target } from "@components/Target";

class Loading extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  targetWillMount() {
    this.styleManager.addStyle(this.styleId, css);
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

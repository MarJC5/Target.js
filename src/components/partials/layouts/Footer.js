import { Target } from "../../Target.js";

class Footer extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  targetWillMount() {
    this.styleManager.addStyle(this.styleId, css);
  }

  render() {
    const html = `
      <div class="footer row">
        <p>&copy; {{copyright}} - {{title}} by <a href="{{github}}">{{author}}</a></p>
      </div>
    `;

    return Target.parseHTML(html, Target.dataToObject(this.props.content));
  }
}

const css = {
  '.footer a': `
    color: black;
    text-decoration: none;
  `,
};

export default Footer;

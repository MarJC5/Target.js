import { Target } from "../../Target.js";

class Footer extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  targetDidMount() {
    console.log("Target has mounted: Footer");
    this.styleManager.addStyle(this.container.id, css);
  }

  targetDidUpdate() {
    console.log("Target did update: Footer");
    this.styleManager.addStyle(this.container.id, css);
  }

  render() {
    const html = `
      <div class="footer row">
        <p>&copy; {{copyright}} - {{title}} by <a href="{{github}}">{{author}}</a></p>
      </div>
    `;

    return Target.parseHTML(html, {
        copyright: new Date().getFullYear().toString(),
        title: this.props.content.title,
        github: this.props.content.github,
        author: this.props.content.author,
    });
  }
}

const css = {
  '.footer a': `
    color: black;
    text-decoration: none;
  `,
};

export default Footer;

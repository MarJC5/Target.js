import { Target } from "../../Target.js";

class Header extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  targetWillMount() {
    this.styleManager.addStyle(this.styleId, css);
  }

  render() {
    const html = `
        <div class="header row flex">
          <a data-link href="/">{{title}}</a>
          <nav class="flex">
              <a href="{{github}}">Github</a>
              <a data-link href="/about">About</a>
          </nav>
        </div>
    `;

    return Target.parseHTML(html, Target.dataToObject(this.props.content));
  }
}

const css = {
  '.header nav': `
    gap: 1rem;
  `,
  '.header a': `
    color: black;
    text-decoration: none;
  `,
};

export default Header;

import { Target } from "../../Target.js";

class Header extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
  }

  targetDidMount() {
    console.log("Target has mounted: Header");

    this.styleManager.addStyle(this.container.id, css);
  }

  targetDidUpdate() {
    console.log("Target did update: Header");
  }

  unmount() {
    this.styleManager.removeStyle(this.container.id);
  }

  render() {
    const html = `
        <div class="header row flex">
          <a href="/">{{title}}</p>
          <nav class="flex">
              <a href="{{github}}">Github</a>
          </nav>
        </div>
    `;

    return Target.parseHTML(html, {
      github: this.props.content.github,
      title: this.props.content.title,
    });
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

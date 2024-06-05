import { Target } from "../../Target.js";
import { HeadManager } from "../../HeadManager.js";

class FluidContainer extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {};
    this.state = {
      data: null,
      loading: true,
      error: null,
      fetched: false,
    };
    if (this.props.api) {
      this.fetch(this.props.api.url, {}, {...this.props.api.headers});
    }
    this.head = new HeadManager(document.head);
  }

  targetWillMount() {
    if (this.props.css) {
      this.styleManager.addStyle(this.styleId, this.props.css);
    }

    if (this.props.links && this.props.links.length > 0) {
      this.props.links.forEach((link) => {
        this.styleManager.injectLinkedStyle(
          link.link,
          link.rel,
          link.crossorigin ? "crossorigin" : ""
        );
      });
    }
  }

  targetDidMount() {
    if (!this.state.fetched && this.props.api) {
      this.api
        .get(this.props.api.endpoint)
        .then(({ json }) => {
          this.setState({ data: json, loading: false, fetched: true });
        })
        .catch((error) => {
          console.error("Fetch error:", error.message);
          this.setState({ data: null, loading: false, error: error.message, fetched: true });
        });

      this.head.setTitle(this.state.data ? this.state.data.title : "");
    }

    if (!this.props.api && !this.state.fetched) {
      this.setState({ loading: false, fetched: true });
    }
  }

  render() {
    if (this.state.loading) {
      const html = `
        <div data-target-name="loading" data-message='Loading...'></div>
      `;
      return Target.parseHTML(html, {});
    }

    if (this.state.error) {
      const html = `
        <div data-target-name="error" data-message='${this.state.error}'></div>
      `;
      return Target.parseHTML(html, {});
    }

    if (this.state.data) {
      return Target.parseHTML(this.props.html, Target.dataToObject(this.state.data));
    } else {
      return Target.parseHTML(this.props.html, {});
    }
  }
}

export default FluidContainer;

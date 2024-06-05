import { Target } from "@components/Target";

class HelloWorld extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {
      data: null,
      loading: true,
      error: null,
      fetched: false,
    };

    if (this.props.api) {
      this.fetch(this.props.api.url, {}, {...this.props.api.headers});
    }
  }

  targetDidMount() {
    // Example of fetching data from an API
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
    }

    if (!this.props.api && !this.state.fetched) {
      this.setState({ loading: false, fetched: true });
    }
  }

  render() {
    const html = `
      <div class="row">
        <div class="w-half">
          <h1>Hello, {{name}}</h1>
          <h2>{{title}}</h2>
          <p>{{content}}</p>
        </div>
      </div>
    `;

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

    return Target.parseHTML(html, {
      name: this.props.name,
      title: this.state.data ? this.state.data.title : "No title",
      content: this.state.data ? this.state.data.content : "No content",
    });
  }
}

export default HelloWorld;

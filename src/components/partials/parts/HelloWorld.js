import { Target } from "../../Target.js";
import { publicPath, urlPath } from "../../../../utils/index.js";

class HelloWorld extends Target {
  constructor(props, container) {
    super(props, container);
    this.state = {
      data: null,
      loading: true,
    };
    this.fetch(urlPath(publicPath("api")), {}, {
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
    });
  }

  targetDidMount() {
    console.log("Target has mounted: HelloWorld");

    // Example of fetching data from an API
    this.api
      .get(`/hello-world.json`)
      .then(({ json }) => {
        this.setState({ data: json, loading: false });
      })
      .catch((error) => {
        console.error("Fetch error:", error.message);
        this.setState({ data: null, loading: false, error: error.message });
      });
  }

  targetDidUpdate() {
    console.log("Target did update: HelloWorld");
  }

  render() {
    console.log(this.state);
    console.log(this.props);

    const html = `
      <div class="row">
        <div class="w-half">
          <h1>Hello, {{name}}</h1>
          <h2>{{title}}</h2>
          <p>{{content}}</p>
          <a href="
        </div>
      </div>
    `;

    if (this.state.loading) {
      return `
        <div class="row">
          <div class="w-half">
            <p>Loading...</p>
          </div>
        </div>
      `;
    }

    return Target.parseHTML(html, {
      name: this.props.name,
      title: this.state.data ? this.state.data.title : "No title",
      content: this.state.data ? this.state.data.body : "No content",
    });
  }
}

export default HelloWorld;

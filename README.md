# Target.js Framework

The Target.js framework is a minimalistic approach to creating dynamic web applications similar to React. It involves dynamically loading and rendering targets based on the presence of certain DOM elements that act as containers for these targets. This setup leverages modern JavaScript features such as modules, promises, and async/await to efficiently load only the necessary resources.

## Key Features

- **Dynamic Target Loading**: Targets are loaded only when their respective DOM containers are detected, reducing the initial load time.
- **Target Isolation**: Each target manages its own state and lifecycle methods, promoting encapsulation and reusability.
- **Utility Functions**: Includes helper functions for common tasks like converting dataset strings to objects and generating target paths.
- **Child Target Rendering**: The framework supports rendering nested child targets dynamically, allowing complex target hierarchies.

## Project Structure

- `main.js`: The main script that initializes targets when the DOM content is fully loaded. It scans for container IDs and renders targets accordingly.
- `router.js`: Manages the dynamic importing of targets based on their usage on the page.
- `utils/index.js`: Provides utility functions such as `datasetToObject` for data manipulation and `componentsPath` for resolving target file paths.
- `src/components/Target.js`: Contains the base class for creating targets, handling lifecycle methods, state management, and rendering logic.
- `src/components/partials/parts/HelloWorld.js`: An example target that demonstrates the usage of the framework's target system.
- `src/components/partials/parts/App.js`: An example target that demonstrates the usage of the framework's target system.
- `src/components/views/Page.js`: An example target that demonstrates the use of multiple nested child targets within a parent target.

To have a better understanding of the framework, please run a local server and open the `index.html` file in your browser. The example targets will be loaded dynamically based on the container elements defined in the HTML file.
Then, you can explore the source code to see how the targets are defined, loaded, and rendered. Console logs are also available to help you understand the lifecycle of the targets.

## Setup and Usage

1. **Include Scripts**:
   Ensure that `target.js` is included in your HTML file after all necessary DOM elements are defined.

2. **Define Containers**:
   In your HTML, define container elements with an `id` that matches the keys specified in `router.js`. For example:

   ```html
   <body id="app"></body>
   ```

3. **Target Registration**:
   In `router.js`, map container IDs to their respective target loader functions. This setup is used by `main.js` to find and load targets dynamically:

   ```javascript
   const containersTarget = {
       "app": () => import("./path/to/YourTarget.js"),
   };
   ```

4. **Create Targets**:
   Define new targets by extending the `Target` base class into `./src/targets`. Implement required lifecycle methods and the `render` method to define what the target should output. For instance:

   ```javascript
   import { Target, escapeHTML } from "../Target.js";
   
   class YourTarget extends Target {
       render() {
           const html = `<div>Welcome, {{name}}</div>`;

            return Target.parseHTML(html, {
                name: this.props.name,
            });
       }
   }
   ```

5. **Render Child Targets**:
   Child targets can be dynamically rendered within any target using the `data-target-name` attribute. Each child target is then independently loaded and managed:

   ```javascript
   class Index extends Target {
       render() {
           const title = "Target.js";
           return `
               <header data-target-name="header" data-github="https://github.com/MarJC5/target.js" data-title="${title}"></header>
               <main data-target-name="hello-world"></main>
               <footer data-target-name="footer" data-title="${title}" data-author="MarJC5" data-github="https://github.com/MarJC5"></footer>
           `;
       }
   }
   ```

6. **API Integration**:
   Targets can fetch data using the `fetch` method, providing a seamless integration with backend services:

   ```javascript
   class HelloWorld extends Target {
       targetDidMount() {
           this.api.get("/posts/1").then(({ json }) => {
               this.setState({ data: json, loading: false });
           }).catch(error => {
               console.error("Fetch error:", error.message);
           });
       }
   }
   ```

7. **State Management**:
    Props and state can be managed within each target to control the rendering logic and data flow. Use `this.setState` to update the state and trigger a re-render:

    ```javascript
    class HelloWorld extends Target {
        constructor(props) {
            super(props);
            this.state = {
                data: null,
                loading: true,
            };
        }

        render() {
            if (this.state.loading) {
                return "<div>Loading...</div>";
            }

            return `<div>${this.state.data.title}</div>`;
        }
    }
    ```

    Props are passed to the target when it is loaded, while state is managed internally within the target. Use `this.props` to access the props passed to the target, all props must be passed as an object so your data must be JSON serializable or a string.

    ```javascript
    const props = {
        name: "World",
    };

    // OR

    const props = {
        content: JSON.stringify({
            name: "World",
            body: "Hello, World!",
        }),
    };

    <div data-target-name="your-target" data-props-name="${props}"></div>
    ```

8. **Lifecycle Methods**:

## Production

Simply call `main.js` in your HTML file to initialize the framework. The script will scan the DOM for container elements and load the corresponding targets dynamically. Ensure that all targets are bundled and minified for production use.

```html
<script src="path/to/main.js" type="module"></script>
```

## Development

- **Local Development**: Use a local server to serve your files since this framework relies on ES Modules, which require a server environment.
- **Debugging**: Utilize browser developer tools to debug issues related to target loading, rendering, and state management.

## Contributions

Contributions are welcome! Please fork the repository, create your feature branch, commit your changes, and open a pull request. Feel free to suggest new features, report bugs, or provide feedback on the existing implementation.

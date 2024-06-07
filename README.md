# Target.js Framework

The Target.js framework is a minimalistic approach to creating dynamic web applications similar to React. It involves dynamically loading and rendering targets based on the presence of certain DOM elements that act as containers for these targets. This setup leverages modern JavaScript features such as modules, promises, and async/await to efficiently load only the necessary resources.

## Key Features

- **Dynamic Target Loading**: Targets are loaded only when their respective DOM containers are detected, reducing the initial load time.
- **Target Isolation**: Each target manages its own state and lifecycle methods, promoting encapsulation and reusability.
- **Utility Functions**: Includes helper functions for common tasks like converting dataset strings to objects and generating target paths.
- **Child Target Rendering**: The framework supports rendering nested child targets dynamically, allowing complex target hierarchies.
- **Single Page Application (SPA) Mode**: Enable SPA mode to handle client-side navigation without page reloads, improving performance and user experience.

## Project Structure

- `main.js`: The main script that initializes targets when the DOM content is fully loaded. It scans for container IDs and renders targets accordingly.
- `router.js`: Manages the dynamic importing of targets based on their usage on the page.
- `utils/index.js`: Provides utility functions such as `datasetToObject` for data manipulation and `componentsPath` for resolving target file paths.
- `core/Target.js`: Contains the base class for creating targets, handling lifecycle methods, state management, and rendering logic.
- `src/components/partials/layouts/App.js`: An example target that demonstrates the usage of the framework's target system.
- `src/components/views/Page.js`: An example target that demonstrates the use of multiple nested child targets within a parent target.

To have a better understanding of the framework, please run a local server and open the `index.html` file in your browser. The example targets will be loaded dynamically based on the container elements defined in the HTML file.
Then, you can explore the source code to see how the targets are defined, loaded, and rendered. Console logs are also available to help you understand the lifecycle of the targets.

## Setup and Usage

1. **Include Scripts**:
   Ensure that `main.js` is included in your HTML file after all necessary DOM elements are defined.

2. **Define Containers**:
   In your HTML, define container elements with an `id` that matches the keys specified in `router.js`. For example:

   ```html
   <div id="loading" data-message="Loading..."></div>
   ```

3. **Target Registration**:
   In `router.js`, map container IDs to their respective target loader functions. This setup is used by `main.js` to find and load targets dynamically:

   ```javascript
   const targetRegistry = {
       "app": () => import("./path/to/YourTarget.js"),
   };
   ```

4. **Create Targets**:
   Define new targets by extending the `Target` base class into `./src/components`. Implement required lifecycle methods and the `render` method to define what the target should output. For instance:

   ```javascript
   import { Target } from "../Target.js";
   
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

6. **Enable SPA Mode**:
   To enable SPA mode, update your configuration to set `isSPAEnabled` to `true`. This allows the framework to handle client-side navigation without page reloads.

   ```javascript
   export default {
       router: {
           isSPAEnabled: true,
       },
   };
   ```

7. **Using Links for Navigation**:
   In SPA mode, you need to use special attributes for links to ensure the framework can handle them. Add the `data-link` attribute to your anchor tags (`<a>`):

   ```html
   <a href="/about" data-link>About</a>
   ```

   This will enable the SPA navigation to intercept the clicks and load the content dynamically without reloading the page.

8. **Server Configuration for SPA**:
   When using SPA mode, configure your server to redirect all requests to `index.html`. This ensures that client-side routing works correctly even when users navigate directly to a URL or refresh the page.

   - **Apache**: Add a `.htaccess` file with the following content:

     ```plaintext
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
     </IfModule>
     ```

   - **Nginx**: Update your server configuration:

     ```nginx
     server {
       listen 80;
       server_name yourdomain.com;

       root /path/to/your/app;
       index index.html;

       location / {
         try_files $uri $uri/ /index.html;
       }
     }
     ```

9. **API Integration**:
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

10. **State Management**:
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

11. **Lifecycle Methods**:
    Implement lifecycle methods in your targets to manage setup and teardown logic:

    ```javascript
    class HelloWorld extends Target {
        targetDidMount() {
            // Initialization logic here
        }

        targetDidUpdate() {
            // Update logic here
        }

        unmount() {
            // Cleanup logic here
        }
    }
    ```

## Production

Simply call `target.min.js` in your HTML file to initialize the framework. The script will scan the DOM for container elements and load the corresponding targets dynamically. Ensure that all targets are bundled and minified for production use.

```html
<script src="path/to/target.min.js" type="module"></script>
```

To optimize the performance of your application, consider the following best practice is to build with `vite` which is already configured to bundle and minify your code.

```bash
npm run build # or yarn build
```

## Development

- **Local Development**: Use `vite` to run a local development server with hot module reloading for a seamless development experience.

  ```bash
  npm run dev # or yarn dev
  ```

- **Debugging**: Utilize browser developer tools to debug issues related to target loading, rendering, and state management.

## Contributions

Contributions are welcome! Please fork the repository, create your feature branch, commit your changes, and open a pull request. Feel free to suggest new features, report bugs, or provide feedback on the existing implementation.

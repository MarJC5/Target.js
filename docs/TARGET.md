### Target.js Base Class Documentation

## Introduction

The `Target` class is a base class for creating dynamic, stateful components that can be rendered into a DOM container. It provides lifecycle methods, state management, and a fetch utility for making API requests. This class can be extended to create custom components with specific behaviors and rendering logic.

## Installation

Ensure you have the necessary dependencies installed in your project:

```bash
npm install # or yarn install
```

## Usage

### Import Statements

```javascript
import { HTTPRequest } from "@utils/HTTPRequest";
import { StyleManager } from "@core/StyleManager";
import config from "@/target.config";
```

### Utility Function: Render

```javascript
/**
 * Utility function to render a target into a DOM container.
 * After rendering the target's output into the container, it triggers the targetDidMount lifecycle method.
 *
 * @param {Target} target - The target instance to be rendered.
 * @param {HTMLElement} container - The DOM element where the target should be rendered.
 */
const render = (target, container) => {
  const output = target.render();
  container.innerHTML = output;
  target.targetDidMount();
};
```

### Example Usage

#### Extending the Target Class

```javascript
import { Target } from '@core/Target';

class HelloWorld extends Target {
  render() {
    const html = `<div>Hello, {{name}}!</div>`;
    return Target.parseHTML(html, { name: this.props.name });
  }
}

export default HelloWorld;
```

#### Registering and Rendering the Target

```javascript
// router.js
const targetRegistry = {
  'hello-world': () => import('../src/components/HelloWorld.js'),
};

// main.js
import { render, Target } from '@core/Target';
import { targetRegistry } from './router';

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(targetRegistry).forEach(async (targetId) => {
    const loadTarget = targetRegistry[targetId];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const { default: TargetClass } = await loadTarget();
      const target = new TargetClass({}, targetElement);
      render(target, targetElement);
    }
  });
});
```

## Conclusion

The `Target` class provides a robust foundation for creating dynamic, stateful components in your web application. By extending this class, you can define custom behavior and rendering logic for each component, taking advantage of built-in lifecycle methods, state management, and API interaction capabilities.

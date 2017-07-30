# Overview

The functionality of this project is delivered with JavaScript run within node.

## Code

The main node scripts live in the [bin](../bin) directory. They rely on
JavaScript that resides in the [lib](../lib) directory.

## Development

### Tools

The tools that aid in development are:

* JavaScript Linting
* Unit Tests
* Acceptance Tests
* Continuous Integration

### Environments

The project is principally written in node, and development was initially done
in version `6.9.1`.

Acceptance tests are described in `gherkin`, and the runner of these tests in written in ruby.

### Setup

Given that `node` and `ruby` are involved, you get going locally with the following:

```sh
npm install     # Setup Node
bundle          # Setup Ruby
```

And you can know that you've got a functional environment with the following:

```sh
npm run lint             # Lint JavaScript
npm run test             # Unit Tests
bundle exec cucumber     # Acceptance Tests
```


